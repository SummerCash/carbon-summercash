import React from "react";
import AuthForm from "./AuthForm";
import { RouteComponentProps, withRouter } from "react-router";

/**
 * The standard signup form.
 *
 * @param props Component initialization props.
 */
export const StandardSignupForm: React.FunctionComponent<RouteComponentProps> = props => {
    return <AuthForm action="signup" callback={() => props.history.push("/")} />; // Return component
};

export default withRouter(StandardSignupForm); // Return with router
