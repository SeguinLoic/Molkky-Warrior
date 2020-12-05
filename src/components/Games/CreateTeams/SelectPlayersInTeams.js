import React from "react";

export default function SelectPlayersInTeams({ team, players, setPlayers }) {

  const handleChange = (e) => {
    const value = {
      playerID: e.target.id,
      playerName: e.target.className
    }
    const index = team.playersInTeam.indexOf(value);
    const isPlayerInTeam = team.playersInTeam.find(player => player.playerName === value.playerName);
    if(!isPlayerInTeam) {
      team.playersInTeam.push(value);
      setIsPlayerSelected(value.playerName, true);
    } else {
      team.playersInTeam.splice(index, 1);
      setIsPlayerSelected(value.playerName, false);
    }
  };

  const setIsPlayerSelected = (value, boolean ) => {
    setPlayers(
      players.map(player =>
        player.playerName === value 
        ? {...player, isPlayerSelected: boolean} 
        : player
      )
    )
  };

  return (
    <div className="liste-joueurs" id={team.id}>
      <h2>Équipe n°{team.teamNumber}</h2>
      <div className="players-list">
        { 
          players.map((player) => (
            <div className={ player.isPlayerSelected ? "selected" : "" } key={player.id}>
              <input type="checkbox" id={player.id} className={player.playerName} onChange={handleChange} />
              <span>{player.playerName}</span>
            </div>
          )) 
        }
      </div>
    </div>
  );
}
