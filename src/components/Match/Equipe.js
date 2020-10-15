import React, { useState, useEffect } from "react";

export default function Equipe({ equipe, equipes, setEquipes, index, setVictoire }) {
  let points = 0;
  let previousShot = 0;
  let editEquipes = [...equipes];
  const [score, setScore] = useState(0);
  const [zero, setZero] = useState([]);
  const [tour, setTour] = useState(true);

  useEffect(() => {
    if (equipe.tour) {
      setTour(true);
    }
  }, [equipe.tour]);

  const handleChange = (e) => {
    points = e.target.value;
  };

  const handleTour = (value) => {
    value === 25 ? setScore(25) : value === 0 ? setScore(0) : setScore(Number(score) + Number(points));
    editEquipes[index].score = Number(score) + Number(points);
    editEquipes[index].tour = false;
    editEquipes[index + 1] === undefined ? (editEquipes[0].tour = true) : (editEquipes[index + 1].tour = true);
    setTour(false);
    setEquipes(editEquipes);
  };

  const handlePoints = (e) => {
    e.preventDefault();
    if (Number(points) === 0) {
      if (zero.length === 0 || (zero.length === 1 && previousShot === 0)) {
        handleTour();
        setZero([...zero, 0]);
      } else if (zero.length === 2) {
        if (score > 25) {
          handleTour(25);
          setZero([]);
        } else if (score <= 25) {
          handleTour(0);
          setZero([]);
        }
      }
      previousShot = points;
    } else if (Number(score) + Number(points) > 50) {
      handleTour(25);
      setZero([]);
    } else if (Number(score) + Number(points) === 50) {
      handleVictoire(index);
      handleTour();
    } else {
      handleTour();
      setZero([]);
    }
  };

  const handleVictoire = (index) => {
    setVictoire(equipes[index].joueurs);
  };

  return (
    <div className="equipe">
      <span className="score">{score}</span>
      {tour ? (
        <form onSubmit={handlePoints}>
          <input type="number" max="12" onChange={handleChange} />
        </form>
      ) : (
        ""
      )}
      <span>{equipe.joueurs}</span>
    </div>
  );
}
