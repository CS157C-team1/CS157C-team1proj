import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ItemTable from "./item/ItemTable";

const UserItemWidget = ({}) => {
  const { userId } = useParams();
  const [userLoggedOn, setUserLoggedOn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const getUserLoggedOn = async () => {
    const instance = axios.create({ withCredentials: true });
    instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserLoggedOn`)
      .then((res) => {
        setUserLoggedOn(res.data.userInfo);
      })
      .catch((error) => console.log(error.message));
  };

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
    getUserLoggedOn();
    getUserInfo();
  }, [userId]);

  return (
    <>
      {userInfo != null && (
        <div className="user-items-info">
            <div></div>
          <ItemTable userInfo={userInfo} displayUserArray="posted"></ItemTable>
        </div>
      )}
    </>
  );
};

export default UserItemWidget;
