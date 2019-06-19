import styled from "styled-components";
import "./fonts/ibm-plex.css";

export const CenteredVerticallyAndHorizontally = styled.div`
    display: flex;
    alignitems: center;
    justifycontent: center;
`;

export const LargeHeader = styled.h1`
    color: ${props => props.color};
    font-family: "IBM Plex Sans", "Helvetica Neue";
    font-weight: 300;
`;
