import React, {useCallback, useContext} from "react"
import { AuthContext } from "./Auth";
import firebase from "./firebase"
import "./Login.css";

const Login = ({ setIsLogged }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
            } catch(error) {
                alert(error);
            }
        }, []
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        setIsLogged(true);
    }

    return (
        <form onSubmit={handleLogin} id="login">
            <div className="rowForm">
                <span>E-mail</span>
                <input type="email" id="email"></input>
            </div>
            <div className="rowForm">
                <span>Password</span>
                <input type="password" id="password"></input>
            </div>
            <button>Connexion</button>
        </form>
    )
};

export default Login;