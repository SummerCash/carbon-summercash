import React, { useState } from "react";
import * as cookieUtility from "./cookieUtility";
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
} from "carbon-components-react/lib/components/UIShell";
import { InlineNotification, InlineLoading } from "carbon-components-react";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import { GlobalStyle } from "./theme";
import { RouteComponentProps, withRouter } from "react-router";
import MediaQuery from "react-responsive";
import { apiRoot } from "./config";
import { Accounts } from "@summercash/summercash-wallet-ts";
import * as Cookies from "es-cookie";
import { Line } from "react-chartjs-2";

import Splash from "./Splash";
import AppSwitcher from "./AppSwitcher";

const MakeGraphData = (balances: number[]): any => {
    let template = {
        labels: [] as string[],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: balances,
            },
        ],
    }; // Initialize template

    balances.forEach((balance, i) => {
        template.labels.push(i.toString()); // Append iterator
    });

    return template; // Return edited template
};

export const Dashboard: React.FunctionComponent<RouteComponentProps> = props => {
    const [shouldShowSwitcherPanel, setShouldShowSwitcherPanel] = useState(false); // Create switcher panel state
    const [toastNotification, setToastNotificationMessage] = useState({ type: "", title: "", message: "" }); // Notification
    const [hasLoaded, setHasLoaded] = useState(false); // Create has loaded state
    const [transactionData, setTransactionData] = useState([] as number[]); // Create tx data state

    const accounts = new Accounts(`${apiRoot}/api`); // Init API instance

    let extraMarginLeft = "auto"; // Init extra margin buffer

    try {
        accounts.getAccountTransactions(Cookies.get("username") || "").then(transactions => {
            if (hasLoaded) { // Check has already loaded
                return; // Return
            }

            let balance = 0; // Initialize balance buffer

            let clearedHashes = new Map(); // Init cleared hashes map

            if (transactions === null || transactions.length === 0) { // Check no transactions
                setHasLoaded(true); // Set has loaded

                return; // Return
            }

            setTransactionData([0]); // Set to empty array

            for (let i = 0; i < 10; i++) {
                
            }

            transactions.forEach(transaction => {
                if (!clearedHashes.get(transaction.hash)) {
                    // Check not already cleared
                    if (
                        transaction.sender === Cookies.get("address") ||
                        transaction.sender === Cookies.get("username")
                    ) {
                        // Check is sender
                        balance -= transaction.amount; // Subtract amount
                    } else if (
                        transaction.recipient === Cookies.get("address") ||
                        transaction.recipient === Cookies.get("username")
                    ) {
                        // Check is recipient
                        balance += transaction.amount; // Add amount
                    }
                } else {
                    balance += transaction.amount; // Add amount
                }

                setTransactionData([...transactionData, balance]); // Push transaction

                clearedHashes.set(transaction.hash, true); // Set cleared
            }); // Do for each tx

            setHasLoaded(true); // Set has loaded
        });
    } catch (exception) {
        setToastNotificationMessage({
            type: "error",
            title: "An Error Occurred",
            message: exception.toString(),
        }); // Notification

        setHasLoaded(true); // Set has loaded
    }

    if (window.innerWidth >= 1080) {
        // Check small window
        extraMarginLeft = "16rem"; // Set extra margin
    }

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
                <MediaQuery minWidth={1080}>
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "3rem",
                            width: "16rem",
                            height: "100vh",
                            borderLeft: "1px solid #3d3d3d",
                            borderRight: "1px solid #3d3d3d",
                            backgroundColor: "#171717",
                            color: "#bebebe",
                        }}
                    >
                        <AppSwitcher selected="dashboard" />
                    </div>
                </MediaQuery>
            </Header>
            <div style={{ marginTop: "3rem", marginLeft: extraMarginLeft, height: "100%", color: "#ffffff" }}>
                <div style={{ marginTop: "6%", marginLeft: "4%", marginRight: "4%", height: "100%" }}>
                    {toastNotification.message !== "" && (
                        <InlineNotification
                            kind={toastNotification.type}
                            title={toastNotification.title}
                            subtitle={toastNotification.message}
                        />
                    )}
                    {!hasLoaded ? (
                        <InlineLoading style={{ color: "#ffffff" }} description="Loading data..." />
                    ) : (transactionData.length !== 0 && hasLoaded) ? (
                        <Line data={MakeGraphData(transactionData)} />
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(Dashboard); // Export dashboard component by default
