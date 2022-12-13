import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.onRemoveToken();
        // optioanl: can use history replace method again
        history.replace("/");
    };

    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!authCtx.isAuthenticated && (
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    )}

                    {authCtx.isAuthenticated && (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
