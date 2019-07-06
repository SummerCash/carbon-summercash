import React, { useState, useEffect } from "react";
import * as cookieUtility from "./cookieUtility";
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    DataTable,
} from "carbon-components-react/lib/components/UIShell";
import { InlineNotification, InlineLoading } from "carbon-components-react";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import { GlobalStyle, LargeHeader, MediumHeader, SmallHeader } from "./theme";
import { RouteComponentProps, withRouter } from "react-router";
import MediaQuery from "react-responsive";
import { apiRoot, websocketRoot } from "./config";
import { Accounts } from "@summercash/summercash-wallet-ts";
import * as Cookies from "es-cookie";
import { Line } from "react-chartjs-2";
import Blockies from "react-blockies";
import useWebSocket from "react-use-websocket";

import Splash from "./Splash";
import AppSwitcher from "./AppSwitcher";

const MakeGraphData = (balances: number[]): any => {
    let template = {
        labels: [] as string[],
        datasets: [
            {
                label: "Account Balance",
                fill: false,
                lineTension: 0.4,
                backgroundColor: "rgba(0,0,0,0.0)",
                borderColor: "rgba(255,255,255,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(255,255,255,0)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(0,0,0,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
                data: balances,
            },
        ],
    }; // Initialize template

    balances.forEach((_, i) => {
        template.labels.push(i.toString()); // Append iterator
    });

    if (balances.length === 2) {
        // Check only two points
        template.datasets[0].lineTension = 0; // No line tension
    }

    return template; // Return edited template
};

export const Dashboard: React.FunctionComponent<RouteComponentProps> = props => {
    const [shouldShowSwitcherPanel, setShouldShowSwitcherPanel] = useState(false); // Create switcher panel state
    const [toastNotification, setToastNotificationMessage] = useState({ type: "", title: "", message: "" }); // Notification
    const [hasLoaded, setHasLoaded] = useState(false); // Create has loaded state
    const [transactionData, setTransactionData] = useState([] as number[]); // Create tx data state
    const [balance, setBalance] = useState(""); // Create balance state buffer
    const [hasGottenWebSocket, setHasGottenWebSocket] = useState(false); // Create has gotten WebSocket state buffer
    const [graphData, setGraphData] = useState({}); // Create graph data state var
    const [sendMessage, lastMessage, readyState] = useWebSocket(`${websocketRoot}/ws/${Cookies.get("username")}`); // Call WS hook

    const accounts = new Accounts(`${apiRoot}/api`); // Init API instance

    const address = Cookies.get("address"); // Get address
    const username = Cookies.get("username"); // Get username

    useEffect(() => {
        if (lastMessage) {
            const split = lastMessage.data.split(":"); // Split by :

            const balance = split[0]; // Get balance

            setGraphData(MakeGraphData([...transactionData, parseFloat(balance)])); // Make graph data
            setBalance(balance); // Set balance
            setTransactionData([...transactionData, parseFloat(balance)]); // Set tx data
        }
    }, [lastMessage, transactionData]);

    // if (!hasGottenWebSocket) {
    //     // Check must create socket

    //     // socket.addEventListener("open", e => {
    //     //     setToastNotificationMessage({
    //     //         type: "success",
    //     //         title: "Success",
    //     //         message: "WebSocket connection established successfully.",
    //     //     }); // Show websocket notification
    //     // }); // Set conn open listener

    //     // socket.addEventListener("error", e => {
    //     //     setToastNotificationMessage({
    //     //         type: "error",
    //     //         title: "Error",
    //     //         message: "A WebSocket connection could not be established successfully.",
    //     //     });
    //     // });

    //     // socket.addEventListener("message", e => {
    //     //     const split = e.data.split(":"); // Split by :

    //     //     const balance = split[0]; // Get balance

    //     //     setGraphData(MakeGraphData([...transactionData, parseFloat(balance)])); // Make graph data
    //     //     setBalance(balance); // Set balance
    //     //     setTransactionData([...transactionData, parseFloat(balance)]); // Set tx data
    //     // });

    //     setHasGottenWebSocket(true); // Set has gotten socket
    // }

    // useEffect(() => {
    //     return function cleanup() {
    //         socket.close(); // Close account WebSocket
    //     };
    // }); // Clean up

    accounts.getAccountBalance(username || "").then(balance => setBalance(balance.toLocaleString())); // Set balance

    let extraMarginLeft = "auto"; // Init extra margin buffer

    try {
        accounts.getAccountTransactions(username || "").then(transactions => {
            if (hasLoaded) {
                // Check has already loaded
                return; // Return
            }

            let balance = 0; // Initialize balance buffer

            let clearedHashes = new Map(); // Init cleared hashes map

            let numTransactions = 10; // Number of transactions

            let balances = [] as number[]; // Init balances buffer

            if (transactions == null || transactions.length < 10) {
                // Check not enough txs
                balances.push(0); // Push zero balance

                if (transactions == null || transactions.length === 0) {
                    balances.push(0); // Push zero balance
                } else {
                    numTransactions = transactions.length; // Set num
                }
            }

            if (transactions !== null && transactions.length > 0) {
                // Check has txs
                transactions.forEach((transaction, i) => {
                    if (!clearedHashes.get(transaction.hash)) {
                        // Check not already cleared
                        if (transaction.sender === address || transaction.sender === username) {
                            // Check is sender
                            balance -= transaction.amount; // Subtract amount
                        } else if (transaction.recipient === address || transaction.recipient === username) {
                            // Check is recipient
                            balance += transaction.amount; // Add amount
                        }
                    } else {
                        balance += transaction.amount; // Add amount
                    }

                    if (i >= transactions.length - numTransactions - 1) {
                        // Check is in range
                        balances.push(balance); // Push balance
                    }

                    clearedHashes.set(transaction.hash, true); // Set cleared
                }); // Iterate through txs
            }

            const graphData = MakeGraphData([...balances]); // Make graph data

            setTransactionData([...balances]); // Push transaction
            setGraphData(graphData); // Make graph data

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
                <div
                    style={{
                        marginTop: "6em",
                        marginLeft: "4%",
                        marginRight: "4%",
                        height: (0.4 * window.innerHeight).toString() + "px",
                    }}
                >
                    {toastNotification.message !== "" && (
                        <InlineNotification
                            kind={toastNotification.type}
                            title={toastNotification.title}
                            subtitle={toastNotification.message}
                        />
                    )}
                    {!hasLoaded ? (
                        <InlineLoading style={{ color: "#ffffff" }} description="Loading data..." />
                    ) : transactionData.length !== 0 &&
                      hasLoaded &&
                      graphData &&
                      graphData !== undefined &&
                      graphData !== null &&
                      graphData["datasets"].length !== 0 ? (
                        <React.Fragment>
                            <div style={{ margin: "0 auto" }}>
                                <MediaQuery minWidth={430}>
                                    <div style={{ float: "left" }}>
                                        <Blockies seed={address} scale={12.5} className="blocky" />
                                    </div>
                                </MediaQuery>
                                <div style={{ float: "left", marginLeft: "1.125em" }}>
                                    <LargeHeader>{username}</LargeHeader>
                                    <MediaQuery minWidth={539}>
                                        <MediumHeader marginTop="1%" marginBottom="1%">
                                            {address}
                                        </MediumHeader>
                                    </MediaQuery>
                                    <SmallHeader>{balance} SMC</SmallHeader>
                                </div>
                            </div>
                            <div style={{ height: "77.5%" }}>
                                <Line
                                    data={graphData}
                                    options={{
                                        legend: { display: false },
                                        scales: {
                                            xAxes: [
                                                {
                                                    gridLines: {
                                                        display: false,
                                                    },
                                                    ticks: {
                                                        callback: (value, index, values) => {
                                                            return null; // Hide tick labels
                                                        },
                                                    },
                                                },
                                            ],
                                            yAxes: [
                                                {
                                                    gridLines: {
                                                        display: false,
                                                    },
                                                    ticks: {
                                                        callback: (value, index, values) => {
                                                            return null; // Hide tick labels
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                        tooltips: {
                                            enabled: true,
                                            callbacks: {
                                                title: (tooltipItem, data) => {
                                                    return ""; // Hide tooltip header
                                                },
                                            },
                                        },
                                        elements: {
                                            line: {
                                                borderWidth: 1.5,
                                            },
                                        },
                                        layout: {
                                            padding: {
                                                right: 20,
                                            },
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                />
                            </div>
                            {/* <DataTable
                                rows={}
                                render={({ rows, headers, getHeaderProps }) => (
                                    <DataTable.TableContainer title="DataTable">
                                        <DataTable.Table>
                                            <DataTable.TableHead>
                                                <DataTable.TableRow>
                                                    {headers.map(header => (
                                                        <DataTable.TableHeader {...getHeaderProps({ header })}>
                                                            {header.Header}
                                                        </DataTable.TableHeader>
                                                    ))}
                                                </DataTable.TableRow>
                                            </DataTable.TableHead>
                                            <DataTable.TableBody>
                                                {rows.map(row => (
                                                    <DataTable.TableRow key={row.id}>
                                                        {row.cells.map(cell => (
                                                            <DataTable.TableCell key={cell.id}>
                                                                {cell.value}
                                                            </DataTable.TableCell>
                                                        ))}
                                                    </DataTable.TableRow>
                                                ))}
                                            </DataTable.TableBody>
                                        </DataTable.Table>
                                    </DataTable.TableContainer>
                                )}
                            /> */}
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(Dashboard); // Export dashboard component by default
