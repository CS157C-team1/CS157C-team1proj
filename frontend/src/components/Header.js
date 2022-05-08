import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleLogoutComponent from "./google/GoogleLogoutComponent";
import GoogleLoginComponent from "./google/GoogleLoginComponent";
import AddItemModal from "./modals/AddItemModal";
import shoppingCart from "../images/shoppingCart.png";
import wishListIcon from "../images/wishIcon.png";
import { Link } from "react-router-dom";

const Header = ({ isUserLoggedOn, updateUser, userInfo }) => {
  const [showModal, setShowModal] = useState(false);

  const onClickAddItem = () => {
    setShowModal(true);
    // <AddItemModal showModal={showModal} setShowModal={setShowModal} />;
  };

  return (
    <>
      <div className="generic-card header">
        <div className="navBar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>Starflow</h1>
          </Link>
          {isUserLoggedOn && (
            <button className="btn" onClick={onClickAddItem}>
              SELL
            </button>
          )}
        </div>
        <div className="navBar">
          {isUserLoggedOn ? (
            <>
              <Link to="/wishlist">
                <img src={wishListIcon} alt="heart" className="wish"></img>
              </Link>
              <Link to="/cart">
                <img src={shoppingCart} alt="cart" className="cart"></img>
              </Link>
              <Link to="/">
                <GoogleLogoutComponent updateUser={updateUser} />
              </Link>
              <Link to="/userpage">
                <img
                  src={userInfo.profile_pic_url}
                  alt="User"
                  className="img-round profile-pic"
                ></img>
              </Link>
            </>
          ) : (
            <GoogleLoginComponent updateUser={updateUser} buttonText="Login" />
          )}
        </div>
      </div>
      <AddItemModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

Header.defaultProps = {
  isUserLoggedOn: false,
  userInfo: {
    first_name: "GENERIC FN",
    last_name: "GENERIC LN",
    email: "123@email.com",
    profile_pic_url:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
};

Header.propTypes = {
  user: PropTypes.string,
};
export default Header;
