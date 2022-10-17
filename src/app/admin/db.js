// import firebase from "firebase/app";
// import "firebase/database";

// export const db = firebase
//   .initializeApp({
//     databaseURL:
//       "https://quiz-362507-default-rtdb.europe-west1.firebasedatabase.app/",
//   })
//   .database();

import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: "quiz-362507" })
  .firestore();
