import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
            if (!isLogin) {
                const response = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBufVmhmqPNp85ECeITp0cXyf88lk80p4w",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: eneteredEmail,
                            password: enteredPassword,
                            returnSecureToken: true,
                        }),
                    }
                );

                setIsLoading(false);

                if (response.ok) {
                    const data = await response.json();
                    console.log("signing up");
                    console.log(data);
                } else {
                    const error = await response.json();
                    throw new Error(error.error.message);
                }
            } else {
                const response = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBufVmhmqPNp85ECeITp0cXyf88lk80p4w",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: eneteredEmail,
                            password: enteredPassword,
                            returnSecureToken: true,
                        }),
                    }
                );
                setIsLoading(false);
                if (response.ok) {
                    console.log("logging in");
                } else {
                    const error = await response.json();
                    throw new Error(error.error.message);
                }
            }
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
