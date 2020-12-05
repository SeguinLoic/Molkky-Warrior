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

export const addPlayer = (dataPlayer, players, setPlayers) => {
  setPlayers([...players, dataPlayer]);
  return db
    .collection("Joueurs")
    .add(dataPlayer)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const getPlayers = async (setPlayers) => {
  const players = [];
  const collection = await db.collection("Joueurs").get();
  collection.forEach(function (doc) {
    const data = doc.data();
    const id = doc.id;
    players.push({ ...data, id });
  });
  setPlayers(players);
};

export const incrementNumberGames = async (id) => {
  const player = await db.collection("Joueurs").doc(id);
  player.update({
    numberGames: firebase.firestore.FieldValue.increment(1)
  });
};

export const incrementVictoryPoints = async (id) => {
  const player = await db.collection("Joueurs").doc(id);
  player.update({
    numberVictories: firebase.firestore.FieldValue.increment(1)
  });
};

export default firebase;
