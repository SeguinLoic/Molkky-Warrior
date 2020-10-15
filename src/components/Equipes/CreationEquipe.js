import React, { useState } from "react";

import SelectionJoueurs from "./SelectionJoueurs";

export default function CreationEquipe({
  joueurs,
  setEquipes,
  match,
  setMatch
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [nbEquipes, setNbEquipes] = useState(0);
  const [nouvellesEquipes, setNouvellesEquipes] = useState([]);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    setNouvellesEquipes([
      ...nouvellesEquipes,
      { id: Date.now(), joueurs: [], score: 0, tour: false, victoire: false }
    ]);
    setNbEquipes(nbEquipes + 1);
  };

  const handleGame = (e) => {
    e.preventDefault();
    let nbJoueurs = [];
    nouvellesEquipes.forEach((equipes) => {
      const joueurs = equipes.joueurs.length;
      if (joueurs > 0) {
        nbJoueurs.push("1");
      }
    });
    if (nbEquipes < 2 || nbJoueurs.length < nbEquipes) {
      return;
    }
    setEquipes(nouvellesEquipes);
    setMatch(!match);
  };

  return (
    <div className="creation-equipe">
      <div className="btn-creation-equipe">
      <button onClick={handleCreateTeam}>Ajouter une équipe</button>
      {nbEquipes >= 2 ? (
        <button onClick={handleGame}>Lancer la partie</button>
      ) : (
        ""
      )}
      </div>
      <div className="selection-joueurs">
      {nouvellesEquipes.map((equipe) => (
        <SelectionJoueurs
          equipe={equipe}
          joueurs={joueurs}
          key={equipe.id}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
      ))}
      </div>
    </div>
  );
}
