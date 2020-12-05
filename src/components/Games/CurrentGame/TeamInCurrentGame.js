import React, { useState } from "react";

export default function TeamInCurrentGame({ team, teams, setTeams, index, setVictory }) {
  
  const [point, setPoint] = useState(0);
  const [zero, setZero] = useState(0);

  const handleChangePoint = (e) => {
    setPoint(e.target.value);
  };

  const handleSubmitPoint = (e) => {
    e.preventDefault();
    checkPoint(Number(point));
  }

  const checkPoint = (pointToCheck) => {
    if (pointToCheck === 0) {
      switch(zero) {
        case 1 :
          setTurnAndAttributePoints(pointToCheck, 2);
          break;
        case 2 : 
          team.score > 25 
          ? setTurnAndAttributePoints(25, 0)
          : setTurnAndAttributePoints("zero", 0); 
          break;
        default : 
          setTurnAndAttributePoints(pointToCheck, 1);
          break;
      }
    } else if ((pointToCheck + team.score) > 50) {
      setTurnAndAttributePoints(25, 0);
    } else if ((pointToCheck + team.score) === 50) {
      attributeVictory();
    } else {
      setTurnAndAttributePoints(pointToCheck, 0);
    }
  }

  const setTurnAndAttributePoints = (points, zero) => {
    attributePoints(index, points);
    setZero(zero);
    setTurn(index);
  }

  const attributePoints = (index, points) => {
    let copyTeams = [...teams];
      points === "zero" 
      ? copyTeams[index].score = 0 
      : points === 25 
      ? copyTeams[index].score = 25
      : copyTeams[index].score += points;
    setTeams(copyTeams);
  }

  const setTurn = (index) => {
    let copyTeams = [...teams];
      copyTeams[index].isTurn = false;
      copyTeams[index + 1] === undefined ? copyTeams[0].isTurn = true : copyTeams[index + 1].isTurn = true;
    setTeams(copyTeams);
  }

  const attributeVictory = () => {
    const playersID = [];
    teams.forEach(team => team.playersInTeam.forEach(player => playersID.push(player.playerID)));
    setVictory({
      winners: team.playersInTeam.map(players => players.playerID), 
      players: playersID
    });
  }

  return (
    <div className="equipe">

      <span className="score">{team.score}</span>
      
      {
        team.isTurn ? 
        (<form onSubmit={handleSubmitPoint}>
          <input type="number" max="12" onChange={handleChangePoint} />
        </form>) : ""
      }

      <span>{team.playersInTeam.map(player => player.playerName)}</span>
    </div>
  );
}
