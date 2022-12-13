import React from "react";

const AuthContext = React.createContext({
    token: String,
    onAddToken: () => {},
    onRemoveToken: Function,
    isAuthenticated: Boolean
});

export default AuthContext;
