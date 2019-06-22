import React from "react";
import AuthForm from "./AuthForm";
import { RouteComponentProps, withRouter } from "react-router";

/**
 * The standard login form.
 *
 * @param props Component initialization props.
 */
export const StandardLoginForm: React.FunctionComponent<RouteComponentProps> = props => {
    return <AuthForm action="login" callback={() => props.history.push("/")} />; // Return component
};

export default withRouter(StandardLoginForm); // Return with router
