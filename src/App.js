import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import AuthProvider from "./store/AuthProvider";

function App() {
    const authCtx = useContext(AuthContext);
    return (
        <AuthProvider>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    {authCtx.isAuthenticated && (
                        <Route path="/auth">
                            <AuthPage />
                        </Route>
                    )}

                    {!authCtx.isAuthenticated && (
                        <Route path="/profile">
                            <UserProfile />
                        </Route>
                    )}
                    <Route path="/*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Layout>
        </AuthProvider>
    );
}

export default App;
