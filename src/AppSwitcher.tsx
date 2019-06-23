import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Switcher, SwitcherItem, SwitcherItemLink } from "carbon-components-react/lib/components/UIShell";

/** Props */
interface AppSwitcherProps {
    selected?: string;
}

export const AppSwitcher: React.FunctionComponent<RouteComponentProps & AppSwitcherProps> = props => {
    return (
        <Switcher aria-label="App Switcher">
            <SwitcherItem aria-label="Dashboard Page Link Item">
                <div onClick={() => props.history.push("/")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "dashboard"} aria-label="Dashboard Page Link" href="">
                        Dashboard
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
            <SwitcherItem aria-label="Wallet Page Link Item">
                <div onClick={() => props.history.push("/wallet")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "wallet"} aria-label="Wallet Page Link" href="login">
                        Wallet
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
            <SwitcherItem aria-label="Quests Page Link Item">
                <div onClick={() => props.history.push("/quests")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "quests"} aria-label="Quests Page Link" href="quests">
                        Quests
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
            <SwitcherItem aria-label="Explorer Page Link Item">
                <div onClick={() => props.history.push("/explorer")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "explorer"} aria-label="Explorer Page Link" href="explorer">
                        Explorer
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
            <SwitcherItem aria-label="Node Page Link Item">
                <div onClick={() => props.history.push("/node")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "Node"} aria-label="Node Page Link" href="node">
                        Node
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
            <SwitcherItem aria-label="Settings Page Link Item">
                <div onClick={() => props.history.push("/settings")} style={{ cursor: "pointer" }}>
                    <SwitcherItemLink isSelected={props.selected === "Settings"} aria-label="Settings Page Link" href="Settings">
                        Settings
                    </SwitcherItemLink>
                </div>
            </SwitcherItem>
        </Switcher>
    );
};

export default withRouter(AppSwitcher); // Export app switcher
