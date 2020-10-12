import React from "react";

import * as firebase from "../Firebase/firebase";

export default function SelectionJoueurs({
  equipe,
  joueurs,
  selectedPlayers,
  setSelectedPlayers
}) {
  const handleChange = (e) => {
    const value = e.target.id;
    setSelectedPlayers([...selectedPlayers, value]);
    if (selectedPlayers.indexOf(value) !== -1) {
      console.log(e.target.value);
      return;
    }
    console.log("Coucou");
    const joueurPartie = joueurs.filter((joueur) => joueur.nom === value);
    const index = equipe.joueurs.indexOf(value);
    if (index === -1) {
      equipe.joueurs.push(value);
      joueurPartie[0].parties = Number(joueurPartie[0].parties) + 1;
      firebase.getPlayer(joueurPartie[0].id, "+");
    } else {
      equipe.joueurs.splice(index, 1);
      joueurPartie[0].parties = Number(joueurPartie[0].parties) - 1;
      firebase.getPlayer(joueurPartie[0].id, "-");
    }
  };

  return (
    <div className="liste-joueurs">
      <h2>Liste des joueurs</h2>
      {joueurs.map((joueur) => (
        <div key={joueur.id}>
          <input type="checkbox" id={joueur.nom} onChange={handleChange} />
          {joueur.nom}
        </div>
      ))}
    </div>
  );
}
