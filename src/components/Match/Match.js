import React from "react";

import Equipe from "./Equipe";

export default function Match({ equipes, joueurs, setEquipes, setMatch, setJoueurs, setVictoire }) {
  return (
    <div className="match">
      {equipes.map((equipe, index) => (
        <Equipe equipe={equipe} key={equipe.id} index={index} equipes={equipes} setEquipes={setEquipes} setVictoire={setVictoire} />
      ))}
    </div>
  );
}
