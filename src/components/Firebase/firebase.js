import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();

// ADD PLAYER TO FIREBASE
export const addJoueur = (infoJoueur) => {
  return db
    .collection("Joueurs")
    .add(infoJoueur)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

// DISPLAY PLAYERS FROM FIREBASE
export const fetchData = async (setJoueurs) => {
  const mesJoueurs = [];
  const collection = await db.collection("Joueurs").get();
  collection.forEach(function (doc) {
    const data = doc.data();
    const id = doc.id;
    mesJoueurs.push({ ...data, id });
  });
  setJoueurs(mesJoueurs);
};

// ADD 1 POINT TO "PARTIES" WHEN PLAYER IS SELECTED
export const getPlayer = async (id, action) => {
  const lejoueur = await db.collection("Joueurs").doc(id);
  if (action === "+") {
    lejoueur.update({
      parties: firebase.firestore.FieldValue.increment(1)
    });
  } else {
    lejoueur.update({
      parties: firebase.firestore.FieldValue.increment(-1)
    });
  }
};

// ADD 1 POINT TO "VICTOIRES" WHEN PLAYER IS WIN
export const addVictory = async (id) => {
  const lejoueur = await db.collection("Joueurs").doc(id);
  lejoueur.update({
    victoires: firebase.firestore.FieldValue.increment(1)
  });
};

export default firebase;
