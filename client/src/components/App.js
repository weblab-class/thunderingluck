import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import SideBar from "./modules/SideBar.js";
import NewWord from "./pages/NewWord.js";
import NewLanguagePage from "./pages/NewLanguage.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";
import { Divider } from "@mui/material";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [query, setQuery] = useState({
    word: "",
    language: "",
    definition_language: "",
  });

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
    get("/api/access");
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} setQuery={setQuery}/>
      <SideBar/>
      <Divider orientation="vertical" flexItem/>
      <div style={{marginRight:400}}>
          <Routes>
            <Route
              path="/"
              element={
                <Skeleton
                  path="/"
                  query = {query}
                  setQuery = {setQuery}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/newword" element={<NewWord />} />
            <Route path="/newlanguage" element={<NewLanguagePage />} />
          </Routes>
      </div>
    </>
  );
};

export default App;
