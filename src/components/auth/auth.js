import React from "react";
import jwt from "jsonwebtoken";

import { LoginContext } from "./context.js";
import If from "../if/index.js";

class Auth extends React.Component {
  render() {
    return (
      <LoginContext.Consumer>
        {context => {
          let user = context.token ? jwt.verify(context.token, "changeit") : {};
          let okToRender =
            context.loggedIn &&
            (this.props.capability
              ? user.capabilities.includes(this.props.capability)
              : true);

          return <If condition={okToRender}>{this.props.children}</If>;
        }}
      </LoginContext.Consumer>
    );
  }
}

export default Auth;
