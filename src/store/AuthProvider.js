import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem("token");

    const [token, setToken] = useState(initialToken);

    const addTokenHandler = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };
    const removeTokenHandler = () => {
        localStorage.removeItem("idToken");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                onAddToken: addTokenHandler,
                onRemoveToken: removeTokenHandler,
                isAuthenticated,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
