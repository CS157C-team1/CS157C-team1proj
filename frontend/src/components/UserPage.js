import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const UserPage = ({ }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);

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

  const combineAdress = () => {
    console.log(userInfo.address);
    return (
      userInfo.address.house_number +
      " " +
      userInfo.address.street_name +
      " " +
      userInfo.address.street_type +
      " " +
      userInfo.address.city +
      ", " +
      userInfo.address.state +
      " " +
      userInfo.address.postal_code
    );
  };

  useEffect(() => {
    getUserInfo();
    console.log(userInfo);
  }, [userId]);

  return (
    <>
      {userInfo != null && (
        <div className="user-info-display">
          <img src={userInfo.profile_pic_url} alt="Profile Pic" />
          <h2>
            {userInfo.first_name} {userInfo.last_name}
          </h2>
          <div>
            <h3 className="field">Email:</h3>
            <h3 className="value">{userInfo.email}</h3>
          </div>

          <div>
            <h3 className="field">Address:</h3>
            <h3 className="value">
              {userInfo.address != null && Object.keys(userInfo.address).length !== 0
                ? combineAdress()
                : "[Address Not Provided]"}
            </h3>
          </div>

          <div>
            <h3 className="field">University:</h3>
            <h3 className="value">
              {userInfo.university != null && Object.keys(userInfo.university).length !== 0
                ? userInfo.university
                : "[University Not Provided]"}
            </h3>
          </div>

        </div>
      )}
    </>
  );
};

export default UserPage;
