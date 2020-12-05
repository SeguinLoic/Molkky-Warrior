import React from "react";

import SelectPlayersInTeams from "./SelectPlayersInTeams";

export default function CreationEquipe({ players, setPlayers, teams, setTeams, setIsGameStarted }) {

  const handleCreateTeam = (e) => {
    e.preventDefault();
    setTeams([...teams, { 
      id: Date.now(), 
      teamNumber: Number(teams.length + 1), 
      playersInTeam: [], 
      score: 0, 
      isTurn: false, 
      isVictorious: false }
    ]);
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    const isPlayerInTeams = teams.map(team => team.playersInTeam.length > 0 );
    if (isPlayerInTeams.includes(false)) {
      return;
    }
    setTurnToRandomTeam();
    setIsGameStarted(true);
  };

  const setTurnToRandomTeam = () => {
    const randomNumber = Math.floor(Math.random() * teams.length) + 1;
    teams.forEach(team => {
      if (team.teamNumber === randomNumber) {
        team.isTurn = true;
      }
    })
  }

  return (
    <div className="creation-equipe">

      <div className="btn-creation-equipe">
        <button onClick={handleCreateTeam}>Add Team</button>
        { teams.length > 1 ? <button onClick={handleStartGame}>Lancer la partie</button> : "" }
      </div>

      <div className="selection-joueurs">
        {
          teams.map((team) => (
            <SelectPlayersInTeams
              team={team}
              players={players}
              setPlayers={setPlayers}
              key={team.id}
            />
          ))
        }
      </div>

    </div>
  );
}
