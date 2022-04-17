import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";
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
    // style={{backgroundImage:`url(${homePageImage})`}}
    <div>
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
          {/* <h2>Base Backend: {process.env.REACT_APP_BASE_BACKEND}</h2> */}
          {/* <div className="generic-card welcome-card"></div> */}
          {/* <img src={homePageImage} alt='University Students'/> */}
        </div>
      )}
    </div>
  );
}

export default App
