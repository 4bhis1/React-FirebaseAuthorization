import React, { useState } from "react";

import Login from "../Component/Login";
import Signup from "../Component/Signup";

import "../Pages/LoginSignup.css";

const LoginSignup = () => {
  let [str, signinFunction] = useState("login");
  // let [txt, commentFunction] = useState("");/

  let loginButton = () => {
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    login.classList.add("active");

    if (signup.classList.contains("active")) signup.classList.remove("active");

    signinFunction("login");
  };

  let signupButton = () => {
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    signup.classList.add("active");

    if (login.classList.contains("active")) login.classList.remove("active");

    signinFunction("signup");
  };

  return (
    <div className="main">
      <div className="mainButton">
        <div
          className="loginButton active"
          id="login"
          onClick={loginButton}
          style={{ borderTopRightRadius: "0px" }}
        >
          Login
        </div>
        <div
          className="loginButton"
          id="signup"
          onClick={signupButton}
          style={{ borderTopLeftRadius: "0px" }}
        >
          Sign Up
        </div>
      </div>
      <div className="mainPart">
        <div style={{ width: "370px" }}>
          {str === "signup" ? <Signup /> : <Login />}
          {str === "signup" ? (
            <>
              <div
                className="signupText"
                onClick={() => {
                  loginButton();
                }}
              >
                Have an Account Log in?
              </div>
              <div className="signupText">Forgot Password?</div>
            </>
          ) : (
            <div
              className="signupText"
              onClick={() => {
                signupButton();
              }}
            >
              Don't have account Create one ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
