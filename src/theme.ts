import styled from "styled-components";
import "./fonts/ibm-plex.css";

export const CenteredVerticallyAndHorizontally = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LargeHeader = styled.h1`
    color: ${props => props.color};
    font-family: "IBM Plex Sans", "Helvetica Neue";
    font-weight: 300;
`;
