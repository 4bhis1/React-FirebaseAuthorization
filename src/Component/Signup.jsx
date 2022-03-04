import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import { app } from "../firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import "../Pages/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [user, updateUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let [error, updateError] = useState({
    nameError: "",
    emailError: "",
    passError: "",
    cpassError: "",
  });

  let [boolError, updateBoolError] = useState(false);

  const changeData = (e) => {
    updateBoolError(false);
    updateError({
      nameError: "",
      emailError: "",
      passError: "",
      cpassError: "",
    });
    let tempName = e.target.name;
    let tempValue = e.target.value;
    updateUser({ ...user, [tempName]: tempValue });
  };

  let navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();

    // navigate("/");

    if (user.password === user.cpassword) {
      const authentication = getAuth();
      createUserWithEmailAndPassword(authentication, user.email, user.password)
        .then((response) => {
          updateUser({
            email: "",
            name: "",
            password: "",
            cpassword: "",
          });
          console.log("Signed in");
          navigate("/");
        })
        .catch((e) => {
          console.log(e.code);

          if (e.code === "auth/weak-password") {
            updateBoolError(true);
            updateError({
              nameError: "",
              emailError: "",
              passError: "Password length should be greater than 6",
              cpassError: "Password length should be greater than 6",
            });
          }

          if (e.code === "auth/email-already-in-use") {
            updateBoolError(true);
            updateError({
              nameError: "",
              emailError: "Email already in use",
              passError: "",
              cpassError: "",
            });
          }
        });
    } else {
      updateBoolError(true);
      updateError({
        nameError: "",
        emailError: "",
        passError: "Password doesn't match",
        cpassError: "Password doesn't match",
      });
    }
  };

  return (
    <>
      <form onSubmit={submitData} method="POST">
        <TextField
          label="Name"
          variant="standard"
          type="text"
          onChange={changeData}
          value={user.name}
          name="name"
          helperText={error.nameError}
          error={boolError}
          autoComplete="off"
          margin="dense"
          required
        />
        <TextField
          label="Email Id"
          variant="standard"
          type="email"
          onChange={changeData}
          value={user.email}
          name="email"
          helperText={error.emailError}
          error={boolError}
          autoComplete="off"
          margin="dense"
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
          helperText={error.passError}
          error={boolError}
          autoComplete="off"
          margin="dense"
          required
        />
        <TextField
          label="Confirm Password"
          variant="standard"
          type="Password"
          onChange={changeData}
          value={user.cpassword}
          name="cpassword"
          className="input"
          helperText={error.cpassError}
          error={boolError}
          autoComplete="off"
          margin="dense"
          required
        />
        <br />

        <input type="submit" value="Sign Up" className="formButton" />
      </form>
    </>
  );
};

export default Signup;
