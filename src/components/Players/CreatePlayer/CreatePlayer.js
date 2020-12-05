import React, { useState } from "react";

import Login from "../../Firebase/Login"
import Logout from "../../Firebase/Logout"
import InputDataPlayer from "./InputDataPlayer";
import * as firebase from "../../Firebase/firebase";
import "./CreatePlayer.css";

export default function CreatePlayer({ players, setPlayers, isLogged, setIsLogged }) {

  const [dataPlayer, setDataPlayer] = useState({ 
    playerName: "", 
    numberGames: "", 
    numberVictories: "",
    isPlayerSelected: false
  });

  const handleChange = (e) => {
    setDataPlayer({ ...dataPlayer, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.addPlayer(dataPlayer, players, setPlayers);
    setDataPlayer({ playerName: "", numberGames: "", numberVictories: "", isPlayerSelected: false });
  };

  return (
    <div className="form-joueur">
      <h2>Création du joueur</h2>

      {
        !isLogged 
        ? <Login setIsLogged={setIsLogged} />
        : <>
          <Logout setIsLogged={setIsLogged} />
          <form onSubmit={handleSubmit} id="form-joueur_form">
            <InputDataPlayer 
              nameLabel={"Player's name"} 
              idInput={"playerName"} 
              valueInput={dataPlayer.playerName} 
              typeInput={"text"} 
              actionInput={handleChange} 
            />
            <InputDataPlayer 
              nameLabel={"Number of games"} 
              idInput={"numberGames"} 
              valueInput={dataPlayer.numberGames} 
              typeInput={"number"} 
              actionInput={handleChange} 
            />
            <InputDataPlayer 
              nameLabel={"Number of victories"} 
              idInput={"numberVictories"} 
              valueInput={dataPlayer.numberVictories} 
              typeInput={"number"} 
              actionInput={handleChange} 
            />
            <button>Create Player</button>
          </form>
        </>
      }
      
    </div>
  );
}
