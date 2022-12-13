import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const history = useHistory();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        const eneteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        try {
            let url = "";

            if (!isLogin) {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBufVmhmqPNp85ECeITp0cXyf88lk80p4w";
            } else {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBufVmhmqPNp85ECeITp0cXyf88lk80p4w";
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: eneteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
            });

            setIsLoading(false);

            if (response.ok) {
                const data = await response.json();

                authCtx.onAddToken(data.idToken);

                // redirecting
                history.replace("/");
            } else {
                const error = await response.json();
                throw new Error(error.error.message);
            }
            //clear fields
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        required
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        required
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}

                    {isLoading && <p>loading...</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
