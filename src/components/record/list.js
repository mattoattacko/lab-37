import React from "react";
import { connect } from "react-redux";

import style from "./record.module.scss";

import Record from "./record.js";
import If from "../if";

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

  render() {
    let records = this.props.records[this.props.model] || [];
    console.log("r", this.props.model, records);
    return (
      <div className={style}>
        <h2>{this.props.model.toUpperCase()}</h2>
        <button onClick={this.reset}>Add New</button>
        <If condition={records}>
          <ul className={style.list}>
            {records.map((record, idx) => (
              <li key={idx}>
                {record.name}
                <button onClick={() => this.editRecord(idx)}>Edit</button>
                <button onClick={() => this.deleteRecord(record._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </If>
        <Record model={this.props.model} id={this.state.id} />
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
