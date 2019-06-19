import React from "react";
import { createGlobalStyle } from "styled-components";

/**
 * Props
 */
interface AuthFormProps {
    action: "login" | "signup";
    callback: any;
}

export default class AuthForm extends React.Component<AuthFormProps> {
    globalStyle = createGlobalStyle`
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
                <header>test</header>
            </React.Fragment>
        );
    }
}
