import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import ItemTable from "./components/item/ItemTable";
import UserPage from "./components/UserPage";
import CheckoutPage from "./components/CheckoutPage";
import ProductPage from "./components/ProductPage";
// import ItemDisplay from "./components/ItemDisplay";

function App() {
  const [isUserLoggedOn, setIsUserLoggedOn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Check Cookies for SESSION TOKEN
  const checkUserLoggedIn = async () => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/auth/getCookie`)
      .then((res) => {
        if ("SESSION_TOKEN" in res.data.cookies) {
          setUserInfo(res.data.user);
          setIsUserLoggedOn(true);
        } else {
          setIsUserLoggedOn(false);
          setUserInfo(null);
        }
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                isUserLoggedOn={isUserLoggedOn}
                updateUser={checkUserLoggedIn}
                userInfo={userInfo}
              />
              {isUserLoggedOn ? (
                <>
                  <div className="center-div">
                    <ItemTable />
                    {/* <ItemDisplay /> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="home-layout">
                    <WelcomeCard updateUser={checkUserLoggedIn} />
                  </div>
                </>
              )}
            </>
          }
        ></Route>
        <Route
          exact
          path="userPage/:userId"
          element={
            <>
              <Header
                isUserLoggedOn={isUserLoggedOn}
                updateUser={checkUserLoggedIn}
                userInfo={userInfo}
              />
              <UserPage userLoggedOn={userInfo} />
            </>
          }
        ></Route>
        <Route
          path="cart"
          element={
            <>
              <Header
                isUserLoggedOn={isUserLoggedOn}
                updateUser={checkUserLoggedIn}
                userInfo={userInfo}
              />
              <div className="center-div">
                <div>
                  <CheckoutPage></CheckoutPage>
                </div>
              </div>
            </>
          }
        ></Route>
        <Route
          path="wishlist"
          element={
            <>
              <Header
                isUserLoggedOn={isUserLoggedOn}
                updateUser={checkUserLoggedIn}
                userInfo={userInfo}
              />
              <h1>Wish List</h1>
            </>
          }
        ></Route>
        <Route
          path="Product/:id"
          element={
            <>
              <Header isUserLoggedOn={isUserLoggedOn} updateUser={checkUserLoggedIn} />
              <ProductPage />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
