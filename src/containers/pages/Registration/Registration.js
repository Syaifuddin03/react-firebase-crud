import React, { Component } from "react";
import "./Registration.scss";
import { Button } from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Registration extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      alert("Success");
      this.setState({
        email: "",
        password: "",
      });
      history.push("/login");
    } else {
      alert("Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="title-card">Registration Page</p>
          <input
            className="input"
            type="text"
            id="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChangeText}
          />
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChangeText}
          />
          <Button
            onClick={this.handleRegisterSubmit}
            title="Register"
            loading={this.props.isLoading}
          ></Button>
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Registration);
