import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import Logo from "../assets/PubChat.png";

import { auth } from "../firebase";
import firebase from "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <div
          style={{
            position: "absolute",
            top: -90,
            alignItems: "center",
            right: 80,
          }}
        >
          <img
            src={Logo}
            alt=""
            width={270}
            style={{
              boxShadow: "2px 2px 2px #888888",
              borderRadius: "32px",
            }}
          />
        </div>
        {/* <h2>Welcome</h2> */}
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>
        <br /> <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
