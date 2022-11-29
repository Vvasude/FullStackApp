import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";
import { app } from "./config/firebase.config";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    //On Page Startup
    firebaseAuth.onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        userCredentials.getIdToken().then((token) => {
          console.log(token);
        });
      } else {
        //If auth state false, redirect to login
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login/" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
