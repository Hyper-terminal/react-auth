import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const [token, setToken] = useState("");

    const addTokenHandler = (tkn) => {
        setToken(tkn);
    };
    const removeTokenHandler = () => {
        setToken("");
    };

    const isAuthenticated = token.length > 0 ? true : false;

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
