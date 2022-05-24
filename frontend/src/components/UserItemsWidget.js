import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ItemTable from "./item/ItemTable";

const UserItemWidget = ({ displayType }) => {
  const { userId } = useParams();
  //   const [userLoggedOn, setUserLoggedOn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  //   const getUserLoggedOn = async () => {
  //     const instance = axios.create({ withCredentials: true });
  //     instance
  //       .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserLoggedOn`)
  //       .then((res) => {
  //         setUserLoggedOn(res.data.userInfo);
  //       })
  //       .catch((error) => console.log(error.message));
  //   };

  const getUserInfo = async () => {
    const instance = axios.create({ withCredentials: true });
    instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserById`, {
        params: { userId: userId },
      })
      .then((res) => {
        setUserInfo(res.data.userInfo);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    // getUserLoggedOn();
    getUserInfo();
  }, [userId]);

  return (
    <>
      {userInfo != null && (
        <div className="user-items-info">
          <div className="user-nav-bar">
            <Link to={"/userpage/" + userId + "/wishlist"}>
              <div className={displayType === "wishlist" && "div-yellow"}>
                <h2>Wishlist</h2>
              </div>
            </Link>

            <Link to={"/userpage/" + userId + "/posted"}>
              <div className={displayType === "posted" && "div-yellow"}>
                <h2>Posted</h2>
              </div>
            </Link>

            <Link to={"/userpage/" + userId + "/bought"}>
              <div className={displayType === "bought" && "div-yellow"}>
                <h2>Bought</h2>
              </div>
            </Link>
          </div>

          <div className="div-left">
            <ItemTable
              userInfo={userInfo}
              displayUserArray={displayType}
            ></ItemTable>
          </div>
        </div>
      )}
    </>
  );
};

export default UserItemWidget;
