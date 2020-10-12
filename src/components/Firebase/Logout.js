import React, { useContext } from "react"
import { AuthContext } from "./Auth"
import firebase from "./firebase"

const Logout = ({ setIsLogged }) => {
    const handleLogout = (e) => {
        e.preventDefault();
        setIsLogged(false);
        firebase.auth().signOut();
    }

    const {currentUser} = useContext(AuthContext);

    if (!currentUser) {
        setIsLogged(false);
    }

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button>Se deconnecter</button>
            </form>
      </div>
    )
};

export default Logout;