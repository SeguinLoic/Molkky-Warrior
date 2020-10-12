import React, { useState } from "react";

import * as firebase from "../Firebase/firebase";

export default function CreationJoueur({ joueurs, setJoueurs }) {
  const [infoJoueur, setInfoJoueur] = useState({
    nom: "",
    parties: "",
    victoires: ""
  });
  const formCreation = document.getElementById("form-joueur_form");

  const handleChange = (e) => {
    const value = e.target.value;
    setInfoJoueur({ ...infoJoueur, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.addJoueur(infoJoueur);
    firebase.fetchData(setJoueurs);
    setJoueurs([...joueurs, infoJoueur]);
    setInfoJoueur({ nom: "", parties: "", victoires: "" });
    formCreation
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
  };

  return (
    <div className="form-joueur">
      <h2>Création du joueur</h2>
      <form onSubmit={handleSubmit} id="form-joueur_form">
        <div className="form-joueur_container-input">
          <span className="form-joueur_label">Nom</span>
          <input
            type="text"
            id="nom"
            placeholder="nom"
            onChange={handleChange}
          />
        </div>
        <div className="form-joueur_container-input">
          <span className="form-joueur_label">Parties</span>
          <input type="number" id="parties" onChange={handleChange} />
        </div>
        <div className="form-joueur_container-input">
          <span className="form-joueur_label">Victoires</span>
          <input type="number" id="victoires" onChange={handleChange} />
        </div>
        <button>Créer</button>
      </form>
    </div>
  );
}
