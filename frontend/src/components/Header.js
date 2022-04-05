import React from "react";
import PropTypes from "prop-types";
import GoogleLogoutComponent from "./GoogleLogoutComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";

const Header = ({ isUserLoggedOn, updateUser }) => {
  return (
    <div className="generic-card header">
      <h1>Starflow</h1>
      {isUserLoggedOn ? (
        <GoogleLogoutComponent updateUser={updateUser} />
      ) : (
        <GoogleLoginComponent updateUser={updateUser} buttonText="Login" />
      )}
    </div>
  );
};

Header.defaultProps = {
  isUserLoggedOn: false,
};

Header.propTypes = {
  user: PropTypes.string,
};
export default Header;
