import React from "react";
import { connect } from "react-redux";

import style from "./record.module.scss";

import Record from "./record.js";
import If from "../if";
import Auth from "../auth/auth.js";

import * as actions from "./actions.js";

// const API = 'http://localhost:3000';
const API = "https://javascript-401-api.herokuapp.com";

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  deleteRecord = id => {
    // Note that the server requires _id, so we're
    // rendering with _id instead of id in the click method
    const url = `${API}/api/v1/${this.props.model}/${id}`;
    this.props.handleDelete({ url: url, model: this.props.model, id: id });
  };

  editRecord = id => {
    this.setState({ id });
  };

  reset = () => {
    let id = null;
    this.setState({ id });
  };

  componentDidMount() {
    let url = `${API}/api/v1/${this.props.model}`;
    this.props.handleGetAll({
      url: url,
      model: this.props.model
    });
  }

  //     <Auth capability="read">
  //        <RecordList model="teams" />
  //     </Auth>

  render() {
    let records = this.props.records[this.props.model] || [];
    console.log("r", this.props.model, records);
    return (
      <div className={style}>
        <h2>{this.props.model.toUpperCase()}</h2>
        <Auth capability="create">
          <button onClick={this.reset}>Add New</button>
        </Auth>
        <If condition={records}>
          <ul className={style.list}>
            {records.map((record, idx) => (
              <li key={idx}>
                {record.name}
                <Auth capability="create">
                  <button onClick={() => this.editRecord(idx)}>Edit</button>
                </Auth>
                <Auth capability="delete">
                  <button onClick={() => this.deleteRecord(record._id)}>Delete</button>
                </Auth>
              </li>
            ))}
          </ul>
        </If>
        <Auth capability="create">
          <Record model={this.props.model} id={this.state.id} />
        </Auth>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleDelete: id => dispatch(actions.destroy(id)),
  handleGetAll: url => dispatch(actions.get(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
