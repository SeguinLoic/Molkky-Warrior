import React, { useState, useEffect } from "react";

import * as firebase from "../../Firebase/firebase";
import TeamInCurrentGame from "./TeamInCurrentGame";

export default function CurrentGame({ teams, setTeams, players, setPlayers, setIsGameStarted, setIsGame }) {

  const [victory, setVictory] = useState();

useEffect(() => {
    if (victory) {
      updateVictoryPointsPlayers(victory.winners);
      updateNumberGamesPlayers(victory.players);
      handleEndGame();
    }
  }, [victory]);

  const updateNumberGamesPlayers = (players) => {
    players.forEach(player => firebase.incrementNumberGames(player));
  }

  const updateVictoryPointsPlayers = (winners) => {
    winners.forEach(winner => firebase.incrementVictoryPoints(winner))
  }

  const handleEndGame = () => {
    deselectedPlayers();
    setIsGameStarted(false);
    setIsGame(false);
  }

  const deselectedPlayers = () => {
    setPlayers(players.map(player => ({...player, isPlayerSelected: false})));
  }

  return (
    <div className="current-game">
      <div className="teams-board">
        { !victory ?
          <div>{
            teams.map((team, index) => (
              <TeamInCurrentGame 
                team={team} 
                key={team.id} 
                index={index} 
                teams={teams} 
                setTeams={setTeams} 
                setVictory={setVictory} 
              />
            ))
          }</div> 
          : ""
        }
      </div>
      <button onClick={handleEndGame}>Cancel Game</button>
    </div>
  );
}
