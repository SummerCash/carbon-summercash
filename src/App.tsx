import * as React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router";
import { cookieUtility } from "./cookieUtility";

import Dashboard from "./Dashboard";
import AuthForm from "./AuthForm";

const routes = [{ path: "/", component: Dashboard }];

@observer
class App extends React.Component<RouteComponentProps, {}> {
    public render() {
        if (!cookieUtility.isSignedIn()) {
            return <AuthForm action="login" callback={() => console.log("test")} />;
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
}

export default withRouter(App); // Use router
