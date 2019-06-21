import React, { useState } from "react";
import { CenteredVerticallyAndHorizontally, LargeHeader, GlobalStyle, TextInput, Button } from "./theme";
import { Form, InlineNotification } from "carbon-components-react";
import { Accounts } from "@summercash/summercash-wallet-ts";
import { apiRoot } from "./config";

/**
 * Props
 */
interface AuthFormProps {
    action: "login" | "signup";
    callback: any;
}

/**
 * A generic authentication form (may be for logging in or creating a new account).
 * 
 * @param props AuthForm initialization props.
 */
export const AuthForm: React.FunctionComponent<AuthFormProps> = props => {
    const accounts = new Accounts(`${apiRoot}/api`); // Init API instance

    const [action] = useState(props.action); // Action prop
    const [username, setUsername] = useState(""); // Username form value
    const [password, setPassword] = useState(""); // Password form value

    const [toastNotification, setToastNotificationMessage] = useState({ type: "", title: "", message: "" }); // Notification

    const handleChangeUsername = (event) => {
        setUsername(event.target.value); // Set state
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value); // Set state
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default

        switch (action) {
            case "login":
                try {
                    await accounts.authenticate(username, password);
                } catch (exception) {
                    setToastNotificationMessage(
                        { type: "error", title: "An Error Occurred", message: exception.toString() }
                    ); // Notification
                }

                break;// Break
            case "signup":
                try {
                    accounts.newAccount(username, password); // Create new account
                } catch (exception) {
                    setToastNotificationMessage(
                        { type: "error", title: "An Error Occurred", message: exception.toString() }
                    ); // Notification
                }

                break; // Break
        }
    }

    return (
        <React.Fragment>
            <GlobalStyle />
            <CenteredVerticallyAndHorizontally>
                <div style={{ width: "70%" }}>
                    <LargeHeader color="#FFFFFF" marginBottom="6.5%">
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                    </LargeHeader>
                    <Form onSubmit={handleSubmit}>
                        <TextInput id="username" labelText="Username" color="#FFFFFF" value={username} onChange={handleChangeUsername} />
                        <TextInput id="password" labelText="Password" color="#FFFFFF" value={password} onChange={handleChangePassword} type="password" marginTop="5%" />
                        <Button type="submit" marginTop="5%">
                            Submit
                        </Button>
                    </Form>
                    {(toastNotification.message !== "") ? (
                        <InlineNotification kind={toastNotification.type} title={toastNotification.title} subtitle={toastNotification.message} />
                    ) : null}
                </div>
            </CenteredVerticallyAndHorizontally>
        </React.Fragment >
    );
}

export default AuthForm;