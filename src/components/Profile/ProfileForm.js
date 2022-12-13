import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
    const newPasswordRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPassword = newPasswordRef.current.value;

        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBufVmhmqPNp85ECeITp0cXyf88lk80p4w",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    password: newPassword,
                    idToken: String(authCtx.token),
                    returnSecureToken: true,
                }),
            }
        );

        if (!res.ok) {
            const data = await res.json();
            alert(data.error.message);
        }else{
          alert("Done! Password change")
        }
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input ref={newPasswordRef} type="password" id="new-password" />
            </div>
            <div className={classes.action}>
                <button type="submit">Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
