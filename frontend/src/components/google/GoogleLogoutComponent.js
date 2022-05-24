import React from "react";
import PropTypes from "prop-types";
import { GoogleLogout } from "react-google-login";
import axios from "axios";

const GoogleLogoutComponent = ({ buttonText, classStyle, updateUser }) => {
  const onSuccess = async () => {
    await axios.delete(`${process.env.REACT_APP_BASE_BACKEND}/auth/logout`, {
      withCredentials: true,
    });
    updateUser(false);
  };

  const onFailure = (error) => {
    console.log("Logout Failure", error);
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
      buttonText={buttonText}
      onLogoutSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => (
        <button
          type="button"
          onClick={renderProps.onClick}
          className={classStyle}
        >
          {buttonText}
        </button>
      )}
    />
  );
};

GoogleLogoutComponent.defaultProps = {
  buttonText: "Logout",
  classStyle: "btn",
};

GoogleLogoutComponent.propTypes = {
  buttonText: PropTypes.string,
  classStyle: PropTypes.string,
};

export default GoogleLogoutComponent;
