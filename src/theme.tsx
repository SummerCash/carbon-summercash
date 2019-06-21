import styled from "styled-components";
import "./fonts/ibm-plex.css";
import { Form as CarbonForm } from "carbon-components-react";

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

export const Form = (
    margin?: string,
    marginTop?: string,
    marginBottom?: string,
    marginLeft?: string,
    marginRight?: string,
) => {
    return <CarbonForm style={{ margin: margin }} />;
};

/* END CUSTOMIZED CARBON COMPONENTS */
