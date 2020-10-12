import React, { useState, useEffect, useContext } from "react";
import "./styles.css";

import * as firebase from "./components/Firebase/firebase";

import CreationJoueur from "./components/Joueurs/CreationJoueur";
import ListeJoueurs from "./components/Joueurs/ListeJoueurs";
import CreationEquipe from "./components/Equipes/CreationEquipe";
import Match from "./components/Match/Match";
import Login from "./components/Firebase/Login"
import Logout from "./components/Firebase/Logout"

import { AuthProvider } from "./components/Firebase/Auth";

export default function App() {
  const [joueurs, setJoueurs] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [match, setMatch] = useState(false);
  const [victoire, setVictoire] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [filtre, setFiltre] = useState();

  useEffect(() => {
    firebase.fetchData(setJoueurs);
  }, []);

  useEffect(() => {
    if (victoire) {
      victoire.forEach((joueur) => {
        joueurs.forEach((personne, index) => {
          if (personne.nom === joueur) {
            firebase.addVictory(personne.id);
            let newResultats = [...joueurs];
            newResultats[index].victoires =
              Number(newResultats[index].victoires) + 1;
            setJoueurs(newResultats);
          }
        });
      });
      setEquipes([]);
      setMatch(false);
      setVictoire();
    }
  }, [victoire]);

  const handleFiltered = (e) => {
    const filtre = e.target.id;
    if (filtre === "nom") {
      setJoueurs(
        joueurs.sort((a, b) => (a.nom > b.nom ? 1 : b.nom > a.nom ? -1 : 0))
      );
    } else if (filtre === "parties") {
      setJoueurs(
        joueurs.sort((a, b) =>
          a.parties < b.parties ? 1 : b.parties < a.parties ? -1 : 0
        )
      );
    } else if (filtre === "victoires") {
      setJoueurs(
        joueurs.sort((a, b) =>
          a.victoires < b.victoires ? 1 : b.victoires < a.victoires ? -1 : 0
        )
      );
    }
  };

  return (
    <div className="App">
      <AuthProvider>
      <h1>Molkky Warrior</h1>

      { isLogged ? (
        <>
          <CreationJoueur joueurs={joueurs} setJoueurs={setJoueurs} />
          <Logout setIsLogged={setIsLogged} />
        </>
      ) : <Login setIsLogged={setIsLogged} />}

      { match ? (
        <Match
          equipes={equipes}
          setEquipes={setEquipes}
          joueurs={joueurs}
          setMatch={setMatch}
          setJoueurs={setJoueurs}
          setVictoire={setVictoire}
        />
      ) : (
        <>
          <CreationEquipe
            joueurs={joueurs}
            setEquipes={setEquipes}
            match={match}
            setMatch={setMatch}
          />
          <ListeJoueurs
            joueurs={joueurs}
            setJoueurs={setJoueurs}
            setFiltre={setFiltre}
            handleFiltered={handleFiltered}
          />
        </>
      )}
      </AuthProvider>
    </div>
  );
}
