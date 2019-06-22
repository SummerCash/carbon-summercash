import * as React from "react";
import * as cookieUtility from "./cookieUtility";

import Splash from "./Splash";

export const Dashboard: React.FunctionComponent = () => {
    if (!cookieUtility.isSignedIn()) {
        // Check not signed in
        return <Splash />; // Display splash screen
    }

    return <header>test</header>;
};

export default Dashboard; // Export dashboard component by default
