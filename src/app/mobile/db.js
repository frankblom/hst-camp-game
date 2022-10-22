import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: "quiz-362507" })
  .firestore();
