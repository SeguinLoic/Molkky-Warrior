import React from "react";

export default function ListeJoueurs({ joueurs, setJoueurs, setFiltre, handleFiltered }) {
  const handleClick = (e) => {
    setFiltre(e.target.id);
    handleFiltered(e);
  };

  return (
    <div className="liste-joueurs">
      <div className="liste-joueurs_legendes">
        <span id="nom" onClick={handleClick}>
          Nom
        </span>
        <span id="parties" onClick={handleClick}>
          Parties
        </span>
        <span id="victoires" onClick={handleClick}>
          Victoires
        </span>
      </div>
      {joueurs.map((joueur) => (
        <div className="joueur" key={joueur.id}>
          <span>{joueur.nom}</span>
          <span>{joueur.parties}</span>
          <span>{joueur.victoires}</span>
        </div>
      ))}
    </div>
  );
}
