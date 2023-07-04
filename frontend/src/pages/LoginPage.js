import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../images/google.png";
import githubIcon from "../images/github.png";
import "./LoginPage.css";

const LoginPage = (props) => {
  const [switchForm, setSwitchForm] = useState("Log In");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);

  const [error, setError] = useState(null);

  const [isAdmin, setIsAdmin] = useState(null);

  const navigate = useNavigate();

  const google = () => {
    window.open(process.env.REACT_APP_GOOGLE_SUCCESS, "_self");
  };

  const github = () => {
    window.open(process.env.REACT_APP_GITHUB_SUCCESS, "_self");
  };

  // clears states to default.
  const clearStates = () => {
    setEmail("");
    setPassword("");
    setEmptyFields([]);
    setError(null);
  };

  // makes request to server sends user credentials
  const loginRequest = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // recieves auth token and user email from db
      const data = await response.json();

      // if res not ok sets error and recevies list of empty inputs from server.
      if (!response.ok) {
        // sets empty fields.
        setEmptyFields(data.emptyFields);
        setError(data.error);
      }

      // if res ok.
      if (response.ok) {
        // sets empty fields to default.
        setEmptyFields([]);
        // resets error.
        setError(null);
        // stores user token and email in local storage.
        localStorage.setItem("user", JSON.stringify(data));
        // sets login state.
        props.setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // request to create new user in db.
  const signupRequest = async () => {
    try {
      // post req with user email and password.
      const response = await fetch(process.env.REACT_APP_SIGNIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // receives user email and auth token.
      const data = await response.json();

      if (!response.ok) {
        // sets empty fields to default.
        setEmptyFields(data.emptyFields);
        // sets error.
        setError(data.error);
      }

      if (response.ok) {
        setEmptyFields([]);
        setError(null);
        localStorage.setItem("user", JSON.stringify(data));
        props.setLoggedIn(true);
        navigate("/");
      }
    } catch (eror) {
      console.log(error);
    }
  };

  // login button clicked, makes call to login request.
  const handleLogin = () => {
    loginRequest();
  };

  // sign up button clicked makes request to sign up user.
  const handleSignUp = () => {
    signupRequest();
  };

  const handleMenu = (e) => {
    if (switchForm === "Log In") {
      setSwitchForm("Sign Up");
    } else {
      setSwitchForm("Log In");
    }

    clearStates();
  };

  useEffect(() => {
    if (email === "admin@gmail.com" && isAdmin) {
      loginRequest();
    }
  }, [email]);

  const demoAdmin = () => {
    setIsAdmin(true);
    setEmail("admin@gmail.com");
    setPassword("admin@123456");
  };

  return (
    <section className="container">
      <div className="container login-container p-5">
        <form action="">
          <div className="form-group">
            <div className="mb-4 login-title-container">
              <h2 className="mb-0">{switchForm}</h2>
              {error && <p className="text-danger bm-0">{error}</p>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${
                  emptyFields.includes("email") ? "is-invalid" : ""
                }`}
                id="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  emptyFields.includes("password") ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary auth-btn btn mb-2"
              onClick={google}
            >
              <span className="auth-btn-container">
                Google <img src={googleIcon} alt="" className="auth-icon" />
              </span>
            </button>

            <button
              type="button"
              className="btn btn-outline-primary auth-btn"
              onClick={github}
            >
              <span className="auth-btn-container">
                Github <img src={githubIcon} alt="" className="auth-icon" />
              </span>
            </button>

            <div className="mt-4 login-btns">
              {switchForm === "Log In" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}

              {switchForm === "Sign Up" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              )}

              <button type="button" className="btn-switch" onClick={handleMenu}>
                {switchForm === "Log In" ? "Sign Up" : "Log In"}
              </button>

              <button
                type="button"
                className="btn btn-outline-info admin-btn"
                onClick={demoAdmin}
              >
                Demo Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
