const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const getKickedAmount = async (team, percentage) => {
  const collectionRef = db.collection("players");
  const query = collectionRef
    .where("team_id", "==", team)
    .where("logged_in", "==", true)
    .where("kicked", "==", false);

  const snapshot = await query.count().get();
  const total = snapshot.data().count;
  return {
    total,
    count: percentage ? Math.round(total * (percentage / 100)) : 0,
  };
};

exports.onPenaltyWrite = functions.firestore
  .document("penalties/{docId}")
  .onWrite((change) => {
    if (!change.after.exists) return false;

    const document = change.after.data();

    functions.logger.log(
      `Updating team:${document.team_id} question: ${document.question_id}:`,
      document
    );

    if (document.executed) return false;

    if (change.before.exists) {
      const before = change.before.data();
      if (document.percentage === before.percentage) return false;
    }

    return getKickedAmount(document.team_id, document.percentage).then(
      (data) => {
        functions.logger.log(`Updating with`, data);
        return change.after.ref.update(data);
      }
    );
  });

const getPenalty = (team, question_id) =>
  db.collection("penalties").doc(`${team}-${question_id}`).get();

const kickPlayers = async (team, question_id) => {
  const penaltyRef = await getPenalty(team, question_id);
  if (!penaltyRef.exists) {
    functions.logger.info(`No penalty for ${team} in ${question_id}`);
    return;
  }
  const penalty = penaltyRef.data();

  if (penalty.executed) {
    functions.logger.info(
      `PENALTY for ${team}, ${question_id} has already been executed`
    );
    return;
  }

  functions.logger.info(`getting penalty for ${team} in ${question_id}`);

  await db
    .collection("penalties")
    .doc(penaltyRef.id)
    .update({ executed: true });

  functions.logger.info(`Got penalty for ${team} in ${question_id}`);

  if (!penalty.count) {
    functions.logger.info(`0 PENALTY for ${team}, ${question_id}`);
    return;
  }

  functions.logger.log(`KICKING ${penalty.count} for ${team}`);

  const snapshot = await db
    .collection("players")
    .where("team_id", "==", team)
    .where("kicked", "==", false)
    .orderBy("age", "desc")
    .limit(penalty.count)
    .get();

  functions.logger.info(`size for query ${snapshot.size}`);
  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    functions.logger.info(`Kicking player ${doc.data().id}`);
    batch.update(doc.ref, {
      kicked: true,
    });
  });

  await batch.commit();

  return;
};

exports.executePenalty = functions.https.onCall(async (data) => {
  const question_id = data.question_id;
  functions.logger.log(`data`, data);

  return Promise.all([
    kickPlayers("green", question_id),
    kickPlayers("orange", question_id),
    kickPlayers("blue", question_id),
    kickPlayers("pink", question_id),
  ])
    .catch((err) => {
      functions.logger.error("error in execute penalty", err);
    })
    .finally(() => {
      return "done";
    });
});

async function deleteCollection(collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

async function resetKickedPlayers() {
  const snapshot = await db
    .collection("players")
    .where("kicked", "==", true)
    .limit(400)
    .get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      kicked: false,
      logged_in: false,
    });
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    resetKickedPlayers();
  });
}

async function resetLoggedInPlayers() {
  const snapshot = await db
    .collection("players")
    .where("logged_in", "==", true)
    .limit(400)
    .get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      logged_in: false,
    });
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    resetLoggedInPlayers();
  });
}

async function resetQuestions() {
  const snapshot = await db.collection("questions").where("step", ">", 0).get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      step: 0,
    });
  });

  await batch.commit();
}

exports.resetGame = functions.https.onCall(async () => {
  return Promise.all([
    deleteCollection("answers", 400),
    deleteCollection("points", 400),
    deleteCollection("penalties", 400),
    resetKickedPlayers(),
    resetLoggedInPlayers(),
    resetQuestions(),
  ])
    .then(() => {
      return "done";
    })
    .catch((err) => {
      functions.logger.error("Error in reset function,", err);
      return "error";
    });
});
