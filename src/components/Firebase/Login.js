import React, {useCallback, useContext} from "react"
import { AuthContext } from "./Auth";
import firebase from "./firebase"

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
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" id="email"></input>
                <input type="password" id="password"></input>
                <button>Se connecter</button>
            </form>
      </div>
    )
};

export default Login;