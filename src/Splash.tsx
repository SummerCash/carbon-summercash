import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { CenteredVerticallyAndHorizontally, LargeHeader, MediumHeader, GlobalStyle, Button } from "./theme";

export const Splash: React.FunctionComponent<RouteComponentProps> = props => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <CenteredVerticallyAndHorizontally>
                <div style={{ textAlign: "center", marginLeft: "2.5%", marginRight: "2.5%" }}>
                    <LargeHeader color="#FFFFFF">SummerCash Wallet</LargeHeader>
                    <MediumHeader color="#FFFFFF" marginTop="5%">
                        Save, store, and send SummerCash.
                    </MediumHeader>
                    <Button
                        type="secondary"
                        marginTop="5%"
                        marginRight="2.5%"
                        textAlign="center"
                        onClick={() => props.history.push("/signup")}
                    >
                        Create New Wallet
                    </Button>
                    <Button
                        type="primary"
                        marginTop="5%"
                        textAlign="center"
                        onClick={() => props.history.push("/login")}
                    >
                        Log In
                    </Button>
                </div>
            </CenteredVerticallyAndHorizontally>
        </React.Fragment>
    );
};

export default withRouter(Splash); // Export
