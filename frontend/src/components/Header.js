import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleLogoutComponent from "./GoogleLogoutComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";
import AddItemModal from "./modals/AddItemModal";

const Header = ({ isUserLoggedOn, updateUser }) => {
  const [showModal, setShowModal] = useState(false);

  const onClickAddItem = () => {
    setShowModal(true);
    <AddItemModal showModal={showModal} setShowModal={setShowModal} />;
  };

  return (
    <>
      <div className="generic-card header">
        <div className="navBar">
          <h1>Starflow</h1>
          {isUserLoggedOn && (
            <button className="btn headerBGColor" onClick={onClickAddItem}>
              SELL
            </button>
          )}
        </div>
        {isUserLoggedOn ? (
          <GoogleLogoutComponent updateUser={updateUser} />
        ) : (
          <GoogleLoginComponent updateUser={updateUser} classStyle="btn-header" buttonText="Login" />
        )}
      </div>
      <AddItemModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

Header.defaultProps = {
  isUserLoggedOn: false,
};

Header.propTypes = {
  user: PropTypes.string,
};
export default Header;
