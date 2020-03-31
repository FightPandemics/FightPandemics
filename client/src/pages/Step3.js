import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import axios from "axios";
// import { withRouter, Route, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = { email: this.state.email };
    const errors = { errors: this.state.errors };

    console.log(userData, errors);

    // const logUserIn = (userData, history) => dispatch => {
    //   axios
    //     .post("/api/users/login", userData)
    //     .then(res => history.push("/medical"))
    //     .catch(err =>
    //       dispatch({
    //         errors,
    //         payload: err.response.data
    //       })
    //     );
    // };
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <h2 className="mb-5">What is your email address?</h2>
          <div style={{ marginRight: "50px" }}>
            <Form onSubmit={this.onSubmit}>
              <Form.Control
                className="mb-3"
                placeholder="Type your email"
                name="email"
                value={this.state.value}
                onChange={this.onChange}
                error={errors.email}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;
