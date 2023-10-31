import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import Logo from "../assets/nav_logo.png";

import { useAuth } from "../context/AuthContext";

import { auth } from "../firebase";

export default function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            // "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "project-id": "7afd693f-19ba-490b-ab8f-bb01850fd824",
            "user-name": user.name || user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.name || user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  // "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                  "private-key": "7c2aafca-b833-43fc-81fe-b41c833d9e91",
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <img
          src={Logo}
          alt="nav_logo"
          width={60}
          style={{ marginTop: 6, marginLeft: 20 }}
        />
        <div className="logo-tab" style={{ marginLeft: 70 }}>
          PubChat
        </div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        // projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        projectID="7afd693f-19ba-490b-ab8f-bb01850fd824"
        userName={user.name || user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
