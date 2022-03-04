import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import { app } from "../firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import "../Pages/LoginSignup.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  let [user, updateUser] = useState({
    email: "",
    password: "",
  });

  let [errorBool, updateErrorBool] = useState(false);
  let [errorText, updateErrorText] = useState({
    emailError: "",
    passwordError: "",
  });

  const changeData = (e) => {
    updateErrorBool(false);
    updateErrorText({
      emailError: "",
      passwordError: "",
    });

    let tempName = e.target.name;
    let tempValue = e.target.value;
    updateUser({ ...user, [tempName]: tempValue });
  };
  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();
    // console.log(user);

    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, user.email, user.password)
      .then((response) => {
        updateUser({
          email: "",
          password: "",
        });
        navigate("/images");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        console.log(error.code);

        updateErrorBool(true);

        if (error.code === "auth/user-not-found") {
          updateErrorText({
            emailError: "User not foud",
            passwordError: "",
          });
        }

        if (error.code === "auth/wrong-password") {
          updateErrorText({
            emailError: "",
            passwordError: "Password not correct",
          });
        }
      });

    // navigate("/images");
  };
  return (
    <>
      <form onSubmit={submitData}>
        <TextField
          label="Email Id"
          variant="standard"
          type="email"
          onChange={changeData}
          value={user.email}
          name="email"
          helperText={errorText.emailError}
          error={errorBool}
          margin="dense"
          autoComplete="off"
          required
        />
        <TextField
          label="Password"
          variant="standard"
          type="Password"
          onChange={changeData}
          value={user.password}
          name="password"
          className="input"
          helperText={errorText.passwordError}
          error={errorBool}
          autoComplete="off"
          margin="dense"
          required
        />
        <br />

        <input type="submit" value="Login" className="formButton" />
      </form>
    </>
  );
};

export default Login;
