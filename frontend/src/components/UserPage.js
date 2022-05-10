import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const UserPage = ({ userLoggedOn }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState([]);

  const getUserLoggedOn = async () => {
    const instance = axios.create({ withCredentials: true });
    instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserLoggedOn`)
      .then((res) => {
        setUserInfo(res.data.userInfo);
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
        console.log(userInfo);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    console.log(userLoggedOn._id == userId);
    if (userLoggedOn._id == userId) {
      getUserLoggedOn();
    } else {
      getUserInfo();
    }
  }, [userId]);

  return (
    <>
      <h1>USER PAGE</h1>
      <h2>{userInfo._id}</h2>
      <h2>{userInfo.first_name}</h2>
    </>
  );
};

export default UserPage;
