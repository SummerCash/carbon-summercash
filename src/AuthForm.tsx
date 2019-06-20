import React from "react";
import { createGlobalStyle } from "styled-components";
import { CenteredVerticallyAndHorizontally, LargeHeader } from "./theme";
import { Form, TextInput } from "carbon-components-react";

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
                    <LargeHeader color="#FFFFFF">
                        {this.props.action.charAt(0).toUpperCase() + this.props.action.slice(1)}
                    </LargeHeader>
                    <Form>
                        <TextInput />
                    </Form>
                </CenteredVerticallyAndHorizontally>
            </React.Fragment>
        );
    }
}
