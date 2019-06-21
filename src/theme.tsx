import React, { FunctionComponent } from "react";
import styled from "styled-components";
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
    label: string;
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
}

export const Form: FunctionComponent<StandardProps> = ({ margin = "0%", marginTop = "0%", marginBottom = "0%", marginLeft = "0%", marginRight = "0%", color = "#FFFFFF" }) => {
    return <CarbonForm style={{ margin: margin, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight, color: color }} />;
};

export const TextInput: FunctionComponent<StandardFormElementProps> = ({ type = "", id = "", labelText = "", margin = "0%", marginTop = "0%", marginBottom = "0%", marginLeft = "0%", marginRight = "0%" }) => {
    return (
        <div style={{ margin: margin, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight }}>
            <CarbonTextInput type={type} id={id} labelText={labelText}/>
        </div>
    );
};

export const Button: FunctionComponent<StandardButtonProps> = ({ label = "", type = "", margin="0%", marginTop = "0%", marginBottom = "0%", marginLeft = "0%", marginRight = "0%" }) => {
    return (
        <CarbonButton type={type} style={{margin: margin, marginTop: marginTop, marginBottom: marginBottom, marginLeft: marginLeft, marginRight: marginRight}}>
            {label}
        </CarbonButton>
    );
};

/* END CUSTOMIZED CARBON COMPONENTS */
