import React from "react";

import RecordList from "./record/list.js";
import Login from "./auth/login.js";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Login />
        <RecordList model="teams" />
      </React.Fragment>
    );
  }
}

export default App;
