import * as React from "react";
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router";
import * as cookieUtility from "./cookieUtility";

import Dashboard from "./Dashboard";
import AuthForm from "./AuthForm";

const routes = [{ path: "/", component: Dashboard }];

export const App: React.FunctionComponent<RouteComponentProps> = () => {
    if (!cookieUtility.isSignedIn()) { // Check not signed in
        return <AuthForm action="login" callback={() => console.log("test")} />; // Display log in form
    }

    return (
        <Switch>
            {routes.map(route => (
                <Route key={route.path} exact={true} path={route.path} component={route.component} />
            ))}
            <Redirect to={{ pathname: "/" }} />
        </Switch>
    );
}

export default withRouter(App); // Use router
