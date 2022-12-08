import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Account,
  Home,
  Login,
  SignUp,
  Playlist,
  GuestPlaylist,
  AboutUs,
  CreateList,
  UpdateList,
  RateList,
} from "./components";
import { app } from "./config/firebase.config";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  var loginHeader = new Headers();

  const [auth, setAuth] = useState(
    false || atob(window.localStorage.getItem("auth")) === "true"
  );

  useEffect(() => {
    //On Page Startup
    firebaseAuth.onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        userCredentials.getIdToken().then((token) => {
          loginHeader.append("Content-Type", "application/json");
          loginHeader.append("Accept", "application.json");
          loginHeader.append("Authorization", "Bearer " + token);

          fetch("/users/login/", {
            method: "GET",
            headers: loginHeader,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success == false) {
                alert(data.msg);
              }
            });
        });
      } else {
        //If auth state false, redirect to login
        setAuth(false);
        window.localStorage.setItem("auth", btoa("false"));
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/Login/" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
        <Route path="/Signup" element={<SignUp setAuth={false} />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/playlists" element={<GuestPlaylist />} />
        <Route path="/auth/playlists" element={<Playlist />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/auth/Createlist" element={<CreateList />} />
        <Route path="/auth/Updatelist" element={<UpdateList />} />
        <Route path="/auth/Ratelist" element={<RateList />} />
      </Routes>
    </div>
  );
};

export default App;
