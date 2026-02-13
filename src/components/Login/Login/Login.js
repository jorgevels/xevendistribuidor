import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../Constants";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Alert from "react-s-alert";
import { useAuth } from "../../../hooks/useAuth";
import googleLogo from "../../../assets/images/google-logo.png";
import "./Login.scss";

const Login = ({ authenticated }) => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useAuth();

  /* useEffect(() => {
    if (location.state && location.state.error) {
      setTimeout(() => {
        Alert.error(location.state.error, { timeout: 5000 });
        history.replace({ ...location, state: {} });
      }, 100);
    }
  }, [location, history]); */

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      Alert.success("You're successfully logged in!");
      history.push("/");
    } catch (error) {
      Alert.error(
        error.message || "Oops! Something went wrong. Please try again!"
      );
    }
  };

  if (currentUser) return <Redirect to="/" replace />;

  return (
    <div className="login__container">
      <div className="login__content">
        <h1 className="login__title">Inicia sesión en Prana</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm handleLogin={handleLogin} />
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
};

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  return (
    <div className="social-login">
      <a className="btnL btn-block social-btn google" onClick={loginWithGoogle}>
        <img src={googleLogo} alt="Google" /> Continue con Google
      </a>
    </div>
  );
};

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
