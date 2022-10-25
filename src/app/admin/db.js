import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { getFunctions } from "firebase/functions";
const app = firebase.initializeApp({ projectId: "quiz-362507" });
// Get a Firestore instance
const db = app.firestore();
const functions = getFunctions(app);

export { db, functions };
