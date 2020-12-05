import React, { useRef } from "react";

export default function PlayersList({ players }) {

  let refPlayersList = useRef();

  const handleSort = (e) => {

    const filter = e.target.id;
    let refPlayers = refPlayersList.current.children;
    refPlayers = Array.prototype.slice.call(refPlayers);

    if (filter === "name") {
      refPlayers.sort((a, b) => (a.dataset[filter] > b.dataset[filter] ? 1 : b.dataset[filter] > a.dataset[filter] ? -1 : 0));
    } else {
      refPlayers.sort((a, b) => (Number(a.dataset[filter]) > Number(b.dataset[filter]) ? -1 : Number(b.dataset[filter]) > Number(a.dataset[filter]) ? 1 : 0));
    }

    for (let i = 0; i < refPlayers.length; i++) {
      refPlayersList.current.appendChild(refPlayers[i]);
    }

  };

  return (
    <div className="liste-joueurs">
      <div className="liste-joueurs_legendes">
        <span id="name" onClick={handleSort}>Name</span>
        <span id="games" onClick={handleSort}>Games</span>
        <span id="victories" onClick={handleSort}>Victories</span>
      </div>
      <div className="playersList" ref={refPlayersList}>
        {players.map((player) => (
          <div className="joueur" data-name={player.playerName} data-games={player.numberGames} data-victories={player.numberVictories} key={player.id}>
            <span>{player.playerName}</span>
            <span>{player.numberGames}</span>
            <span>{player.numberVictories}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
