import React, { useState } from "react";
import { CenteredVerticallyAndHorizontally, LargeHeader, GlobalStyle, TextInput, Button } from "./theme";
import { Form, InlineNotification } from "carbon-components-react";
import { Accounts } from "@summercash/summercash-wallet-ts";
import { apiRoot } from "./config";
import * as cookieUtility from "./cookieUtility";

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

    const handleChangeUsername = event => {
        setUsername(event.target.value); // Set state
    };

    const handleChangePassword = event => {
        setPassword(event.target.value); // Set state
    };

    const handleSubmit = async event => {
        event.preventDefault(); // Prevent default

        let address; // Init address buffer
        let token; // Init token buffer

        switch (action) {
            case "login":
                let canAuth; // Init can auth buffer

                try {
                    canAuth = await accounts.authenticate(username, password); // Authenticate
                    token = await accounts.issueToken(username, password); // Issue token

                    const account = await accounts.queryAccount(username); // Query account

                    address = account.address; // Set address
                } catch (exception) {
                    setToastNotificationMessage({
                        type: "error",
                        title: "An Error Occurred",
                        message: exception.toString(),
                    }); // Notification

                    break; // Break
                }

                if (canAuth) {
                    // Check success
                    cookieUtility.setIsSignedIn(username, address, token); // Set signed in

                    setToastNotificationMessage({
                        type: "success",
                        title: "Success",
                        message: "Signed in successfully.",
                    });
                }

                props.callback(); // Run callback

                break; // Break
            case "signup":
                let canCreateAccount; // Init can auth buffer

                try {
                    canCreateAccount = accounts.newAccount(username, password); // Create new account
                    token = await accounts.issueToken(username, password); // Issue token

                    const account = await accounts.queryAccount(username); // Query account

                    address = account.address; // Set address
                } catch (exception) {
                    setToastNotificationMessage({
                        type: "error",
                        title: "An Error Occurred",
                        message: exception.toString(),
                    }); // Notification

                    break; // Break
                }

                if (canCreateAccount) {
                    // Check success
                    cookieUtility.setIsSignedIn(username, address, token); // Set signed in

                    setToastNotificationMessage({
                        type: "success",
                        title: "Success",
                        message: "Created account successfully.",
                    });
                }

                props.callback(); // Run callback

                break; // Break
        }
    };

    return (
        <React.Fragment>
            <GlobalStyle />
            <CenteredVerticallyAndHorizontally>
                <div
                    style={{
                        width: (100 * (0.3 * (1448 / window.innerWidth))).toString() + "%",
                        marginRight: "5%",
                        marginLeft: "5%",
                    }}
                >
                    <LargeHeader color="#FFFFFF" marginBottom="6.5%">
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                    </LargeHeader>
                    <Form onSubmit={handleSubmit}>
                        <TextInput
                            id="username"
                            labelText="Username"
                            color="#FFFFFF"
                            value={username}
                            onChange={handleChangeUsername}
                        />
                        <TextInput
                            id="password"
                            labelText="Password"
                            color="#FFFFFF"
                            value={password}
                            onChange={handleChangePassword}
                            type="password"
                            marginTop="5%"
                        />
                        <Button type="submit" marginTop="5%">
                            Submit
                        </Button>
                    </Form>
                    {toastNotification.message !== "" ? (
                        <InlineNotification
                            kind={toastNotification.type}
                            title={toastNotification.title}
                            subtitle={toastNotification.message}
                        />
                    ) : null}
                </div>
            </CenteredVerticallyAndHorizontally>
        </React.Fragment>
    );
};

export default AuthForm; // Export
