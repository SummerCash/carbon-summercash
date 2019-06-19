import * as React from "react";
import { observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router";

@observer
class Dashboard extends React.Component<RouteComponentProps, {}> {
  public render() {
    return <header>test</header>;
  }
}

export default withRouter(Dashboard); // Use router
