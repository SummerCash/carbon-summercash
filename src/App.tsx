import * as React from "react";
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router";

import Dashboard from "./Dashboard";
import StandardSignupForm from "./StandardSignupForm";
import StandardLoginForm from "./StandardLoginForm";

export const App: React.FunctionComponent<RouteComponentProps> = props => {
    const routes = [
        { path: "/", component: Dashboard },
        { path: "/login", component: StandardLoginForm },
        { path: "/signup", component: StandardSignupForm },
    ];

    return (
        <Switch>
            {routes.map(route => (
                <Route key={route.path} exact={true} path={route.path} component={route.component} />
            ))}
            <Redirect to={{ pathname: "/" }} />
        </Switch>
    );
};

export default withRouter(App); // Use router
