import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import editIcon from "../images/editIcon.png";
import UserInfoModal from "./modals/UserInfoModal";

const UserPage = ({}) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userLoggedInId, setUserLoggedIn] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const checkUserLoggedIn = async () => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/auth/getCookie`)
      .then((res) => {
        if ("SESSION_TOKEN" in res.data.cookies) {
          setUserLoggedIn(res.data.user._id);
        }
      });
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

  const combineAdress = () => {
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

  const onClickEdit = () => {
    setShowModal(true);
    // <AddItemModal showModal={showModal} setShowModal={setShowModal} />;
  };

  useEffect(() => {
    checkUserLoggedIn();
    getUserInfo();
  }, [userId]);

  return (
    <>
      {userInfo != null && (
        <>
          <div className="user-info-display">
            {userLoggedInId == userId && (
              <div className="div-top-right">
                <img className = "edit-icon" src={editIcon} alt="Edit" onClick={onClickEdit}></img>
              </div>
            )}
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
          <UserInfoModal userInfo={userInfo} showModal={showModal} setShowModal={setShowModal} refreshUser={getUserInfo}></UserInfoModal>
        </>
      )}
    </>
  );
};

export default UserPage;
