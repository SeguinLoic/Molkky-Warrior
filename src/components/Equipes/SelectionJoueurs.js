import React, {useEffect, useState} from "react";

import * as firebase from "../Firebase/firebase";

export default function SelectionJoueurs({
  equipe,
  joueurs,
  selectedPlayers,
  setSelectedPlayers
}) {

  const handleChange = (e) => {

    const value = e.target.id;
    const indexSelected = selectedPlayers.indexOf(value);
    const joueurPartie = joueurs.filter((joueur) => joueur.nom === value);
    const index = equipe.joueurs.indexOf(value);

    if (indexSelected !== -1) {
      return;
    }

    if (index === -1) {
      equipe.joueurs.push(value);
      setSelectedPlayers([...selectedPlayers, value]);
      joueurPartie[0].parties = Number(joueurPartie[0].parties) + 1;
      firebase.getPlayer(joueurPartie[0].id, "+");
    } else {
      equipe.joueurs.splice(index, 1);
      selectedPlayers.splice(1, indexSelected);
      setSelectedPlayers(selectedPlayers);
      joueurPartie[0].parties = Number(joueurPartie[0].parties) - 1;
      firebase.getPlayer(joueurPartie[0].id, "-");
    }

  };

  return (
    <div className="liste-joueurs">
      <h2>Liste des joueurs</h2>
      {joueurs.map((joueur) => (
        <div class="liste-joeurs_joueur" key={joueur.id}>
          <input type="checkbox" id={joueur.nom} className={joueur.nom} onChange={handleChange} />
          <span>{joueur.nom}</span>
        </div>
      ))}
    </div>
  );
}
