import React, {useEffect} from "react";

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

    if (indexSelected !== -1) {
      selectedPlayers.splice(1, indexSelected);
      setSelectedPlayers(selectedPlayers);
      return;
    } else {
      setSelectedPlayers([...selectedPlayers, value]);
    }

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

  useEffect(() => {
    selectedPlayers.forEach(player => {
      const lesJoueurs = document.querySelectorAll("." + player);
      lesJoueurs.forEach(joueur => {
        const parent = joueur.parentNode;
        parent.classList.add("selected");
      })
    });
  }, [selectedPlayers])

  return (
    <div className="liste-joueurs">
      <h2>Liste des joueurs</h2>
      {joueurs.map((joueur) => (
        <div key={joueur.id}>
          <input type="checkbox" id={joueur.nom} className={joueur.nom} onChange={handleChange} />
          <span>{joueur.nom}</span>
        </div>
      ))}
    </div>
  );
}
