const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const getKickedAmount = async (team, percentage) => {
  if (percentage <= 0) return 0;

  const collectionRef = db.collection("players");
  const query = collectionRef
    .where("team_id", "==", team)
    .where("kicked", "==", false);

  const snapshot = await query.count().get();
  const total = snapshot.data().count;
  return {
    total,
    count: Math.round(total * (percentage / 100)),
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

const getPlayersByAge = (team, count) =>
  db
    .collection("players")
    .where("team_id", "==", team)
    .where("kicked", "==", false)
    .orderBy("age", "desc")
    .limit(count)
    .get();

const kickPlayers = (team, count) => {
  const batch = db.batch();

  return getPlayersByAge(team, count)
    .then((players) =>
      players.forEach((player) => {
        batch.update(player.ref, {
          kicked: true,
        });
      })
    )
    .then(() => {
      return batch.commit();
    });
};

const teams = ["green", "orange", "blue", "pink"];

exports.executePenalty = functions.https.onCall((data) => {
  const question_id = data.question_id;
  functions.logger.log(`data`, data);

  teams.forEach((team) =>
    getPenalty(team, question_id)
      .then((ref) => {
        if (!ref.exists) {
          throw new Error(`NO PENALTY for ${team}, ${question_id}`);
        }

        db.collection("penalties").doc(ref.id).update({ executed: true });

        const penalty = ref.data();
        if (!penalty.count) {
          throw new Error(`0 PENALTY for ${team}, ${question_id}`);
        }

        functions.logger.log(`KICKING ${penalty.count} for ${team}`, penalty);

        return kickPlayers(team, penalty.count);
      })
      .catch((err) => functions.logger.log(`ERROR: ${err}`))
  );

  return {
    ...data,
  };
});
