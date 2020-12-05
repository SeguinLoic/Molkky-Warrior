import React, { useState } from "react";

import Login from "../Firebase/Login"
import Logout from "../Firebase/Logout"
import CreateTeams from "./CreateTeams/CreateTeams";
import CurrentGame from "./CurrentGame/CurrentGame";
import { Redirect } from "react-router-dom";

export default function BoardGame({ players, setPlayers, setIsGame, isLogged, setIsLogged, isGame }) {

    const [teams, setTeams] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <div className="boardgame">
          {
            !isLogged 
            ? <Login setIsLogged={setIsLogged} />
            : <>
                <Logout setIsLogged={setIsLogged} />
                {
                  isGameStarted ?   
                    <CurrentGame
                      teams={teams}
                      setTeams={setTeams}
                      players={players}
                      setPlayers={setPlayers}
                      setIsGameStarted={setIsGameStarted}
                      setIsGame={setIsGame}
                    /> : 
                    <CreateTeams
                      players={players}
                      setPlayers={setPlayers}
                      teams={teams}
                      setTeams={setTeams}
                      setIsGameStarted={setIsGameStarted}
                    />
                }
            </>
          }
          {
            !isGame ? <Redirect to="/" /> : ""
          }
        </div>
    )
}