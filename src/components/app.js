import React from "react";

import RecordList from "./record/list.js";
import Login from "./auth/login.js";
import LoginContext from "./auth/context.js";
import Auth from "./auth/auth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginContext>
        <Login />
        <Auth capability="read">
          <RecordList model="teams" />
        </Auth>
      </LoginContext>
    );
  }
}

export default App;
