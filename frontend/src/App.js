import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import ItemTable from "./components/ItemTable";
// import ItemDisplay from "./components/ItemDisplay";

function App() {
  const [isUserLoggedOn, setIsUserLoggedOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check Cookies for SESSION TOKEN
  const checkUserLoggedIn = async () => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/auth/getCookie`)
      .then((res) => {
        console.log(res);
        if ("SESSION_TOKEN" in res.data.cookies) {
          setIsUserLoggedOn(true);
        } else {
          setIsUserLoggedOn(false);
        }
        setIsLoading(false);
      });
  };

  const updateUser = (childData) => {
    setIsUserLoggedOn(childData);
    setIsLoading(false);
  };

  useEffect(() => {
    checkUserLoggedIn();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isUserLoggedOn={isUserLoggedOn} updateUser={updateUser} />
              {isUserLoggedOn ? (
                <>
                  <div className="center-div">
                    <ItemTable />
                    {/* <ItemDisplay /> */}
                  </div>
                </>
              ) : (
                <div className="home-layout">
                  <WelcomeCard updateUser={updateUser} />
                </div>
              )}
            </>
          }
        ></Route>
        <Route
          path="userPage"
          element={
            <>
              <h1>User Information</h1>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
