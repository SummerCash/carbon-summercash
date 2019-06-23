import React, { useState } from "react";
import * as cookieUtility from "./cookieUtility";
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel } from "carbon-components-react/lib/components/UIShell";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import { GlobalStyle } from "./theme";
import { RouteComponentProps, withRouter } from "react-router";
import MediaQuery from "react-responsive";

import Splash from "./Splash";
import AppSwitcher from "./AppSwitcher";

export const Dashboard: React.FunctionComponent<RouteComponentProps> = props => {
    const [shouldShowSwitcherPanel, setShouldShowSwitcherPanel] = useState(false); // Create switcher panel state

    if (!cookieUtility.isSignedIn()) {
        // Check not signed in
        return <Splash />; // Display splash screen
    }

    return (
        <React.Fragment>
            <GlobalStyle />
            <Header aria-label="App Header">
                <HeaderName href="#" prefix="SummerCash">
                    Dashboard
                </HeaderName>
                <HeaderGlobalBar>
                    <HeaderGlobalAction
                        aria-label="App Switcher"
                        onClick={() => setShouldShowSwitcherPanel(!shouldShowSwitcherPanel)}
                    >
                        <AppSwitcher20 />
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
                <HeaderPanel expanded={shouldShowSwitcherPanel} aria-label="App Switcher Panel">
                    <AppSwitcher selected="dashboard" />
                </HeaderPanel>
                <div style={{ position: "absolute", left: 0, width:  }}>
                    <HeaderPanel expanded aria-label="App Switcher Panel">
                        <AppSwitcher selected="dashboard" />
                    </HeaderPanel>
                </div>
            </Header>
        </React.Fragment>
    );
};

export default withRouter(Dashboard); // Export dashboard component by default
