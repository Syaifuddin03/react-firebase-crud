import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import "./Login.scss";
import { Button } from "../../../components/atoms/Button";
// import { registerUserAPI } from "../../../config/redux/action";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      alert("Success");
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      alert("Failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="title-card">Login Page</p>
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
            onClick={this.handleLoginSubmit}
            title="Login"
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
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
