import React, { FunctionComponent } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "./fonts/ibm-plex.css";
import "./theme.css";
import { Form as CarbonForm, TextInput as CarbonTextInput, Button as CarbonButton } from "carbon-components-react";

// eslint-disable-next-line
export const CenteredVerticallyAndHorizontally = styled.div<{
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
}>`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
`;

// eslint-disable-next-line
export const LargeHeader = styled.h1<{
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
}>`
    color: ${props => props.color};
    font-family: "IBM Plex Sans", "Helvetica Neue";
    font-weight: 300;
    font-size: calc(2.625rem + 0 * (100vw - 20rem) / 22);

    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
`;

// eslint-disable-next-line
export const MediumHeader = styled.h2<{
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
}>`
    color: ${props => props.color};
    font-family: "IBM Plex Sans", "Helvetica Neue";
    font-weight: 300;
    font-size: 1.25rem;

    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
`;

// eslint-disable-next-line
export const GlobalStyle = createGlobalStyle`
body > #root > div {
    height: 100vh;
}

body {
    background-color: #000000;
    color: #FFFFFF;
}
`;

/* BEGIN CUSTOMIZED CARBON COMPONENTS */

interface StandardProps {
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    color?: string;
}

interface StandardFormElementProps {
    id: string;
    labelText: string;
    value?: string;
    onChange?: any;
    type?: string;
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    color?: string;
}

interface StandardButtonProps {
    type: string;
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    textAlign?: string;
    onClick?: any;
}

export const Form: FunctionComponent<StandardProps> = ({
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    color = "#FFFFFF",
    children,
}) => {
    return (
        <CarbonForm
            style={{
                margin: margin,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                color: color,
            }}
        >
            {children}
        </CarbonForm>
    );
};

export const TextInput: FunctionComponent<StandardFormElementProps> = ({
    type,
    id,
    labelText,
    value,
    onChange,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
}) => {
    return (
        <div
            style={{
                margin: margin,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
            }}
        >
            <CarbonTextInput type={type} id={id} labelText={labelText} value={value} onChange={onChange} />
        </div>
    );
};

export const Button: FunctionComponent<StandardButtonProps> = ({
    type,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    textAlign,
    onClick,
    children,
}) => {
    return (
        <CarbonButton
            type={type}
            style={{
                margin: margin,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                textAlign: textAlign,
                alignContent: textAlign,
                alignItems: textAlign,
                textAlignLast: textAlign,
            }}
            onClick={onClick}
        >
            {children}
        </CarbonButton>
    );
};

/* END CUSTOMIZED CARBON COMPONENTS */
