import React from "react";
import { createGlobalStyle } from "styled-components";
import { CenteredVerticallyAndHorizontally, LargeHeader, TextInput, Button } from "./theme";
import { Form } from "carbon-components-react";
import * as authUtility from "./authUtility";

/**
 * Props
 */
interface AuthFormProps {
    action: "login" | "signup";
    callback: any;
}

export default class AuthForm extends React.Component<AuthFormProps> {
    globalStyle = createGlobalStyle`
        body > #root > div {
            height: 100vh;
        }

        body {
            background-color: #000000;
            color: #FFFFFF;
        }
    `;

    constructor(props: AuthFormProps) {
        super(props); // Call super

        this.state = {
            action: props.action, // Set action
        }; // Set state
    }

    public render() {
        return (
            <React.Fragment>
                <this.globalStyle />
                <CenteredVerticallyAndHorizontally>
                    <div>
                        <LargeHeader color="#FFFFFF" marginBottom="10%">
                            {this.props.action.charAt(0).toUpperCase() + this.props.action.slice(1)}
                        </LargeHeader>
                        <Form onSubmit={authUtility.authUser}>
                            <TextInput id="username" labelText="Username" color="#FFFFFF" />
                            <TextInput type="password" id="password" labelText="Password" marginTop="10%" color="#FFFFFF" />
                            <Button label="Submit" type="submit" marginTop="10%">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </CenteredVerticallyAndHorizontally>
            </React.Fragment>
        );
    }
}
