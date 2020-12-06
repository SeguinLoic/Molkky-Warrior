import React, { useState, useEffect } from "react";
import "./App.css";

import * as firebase from "./components/Firebase/firebase";
import { AuthProvider } from "./components/Firebase/Auth";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import CreatePlayer from "./components/Players/CreatePlayer/CreatePlayer";
import PlayersList from "./components/Players/PlayersList";
import BoardGame from "./components/Games/BoardGame"

export default function App() {
  const [players, setPlayers] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isGame, setIsGame] = useState(false);

  useEffect(() => {
    firebase.getPlayers(setPlayers);
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>

          <div className="header">
            <h1>Molkky Warrior</h1>
            <div className="navigation">
              <Link to="/">Home</Link>
              <Link to="/BoardGame" onClick={() => setIsGame(true)}>Play a game</Link>
              <Link to="/CreatePlayer">Create player</Link>
            </div>
          </div>

          <Route path="/" exact>
            <PlayersList players={players} />
          </Route>
          <Route path="/BoardGame" exact>
            <BoardGame 
              isLogged={isLogged} 
              setIsLogged={setIsLogged} 
              players={players} 
              setPlayers={setPlayers} 
              setIsGame={setIsGame} 
              isGame={isGame}
            />
          </Route>
          <Route path="/CreatePlayer" exact>
            <CreatePlayer 
              isLogged={isLogged} 
              setIsLogged={setIsLogged} 
              players={players} 
              setPlayers={setPlayers} 
            />
          </Route>

        </Router>
      </AuthProvider>
    </div>
  );
}
