import React from "react";
import superagent from "superagent";
import querystring from "querystring";
import { LoginContext } from "./context.js";
import If from "../if/index.js";

const API = "http://localhost:3000";
// const API = "https://javascript-401-api.herokuapp.com";

export default class Login extends React.Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, loginMethodFromContext) => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(this.state.username, this.state.password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  };

  logout = (e, logoutMethodFromProvider) => {
    logoutMethodFromProvider();
  };

  render() {
    return (
      <LoginContext.Consumer>
        {context => {
          console.log("CTX", context);
          return (
            <>
              <If condition={context.loggedIn}>
                <button onClick={e => this.logout(e, context.logout)}>Log Out</button>
              </If>
              <If condition={!context.loggedIn}>
                <div>
                  <form onSubmit={e => this.handleSubmit(e, context.login)}>
                    <input
                      placeholder="username"
                      name="username"
                      onChange={this.handleChange}
                    />
                    <input
                      placeholder="password"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                    />
                    <input type="submit" value="login" />
                  </form>
                </div>
              </If>
            </>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}
