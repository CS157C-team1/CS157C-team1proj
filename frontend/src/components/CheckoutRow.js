import React from "react";
import PropTypes from "prop-types";
import deleteIcon from "../images/deleteX.png";

const CheckoutRow = ({ itemInfo }) => {
  return (
    <div className="checkout-row">
      {itemInfo.image == null ? (
        <div className="checkout-img">
          <h1>
            NO <br />
            IMAGE
            <br /> FOUND
          </h1>
        </div>
      ) : (
        <image></image>
      )}
      <div className="item-info">
        <h1>{itemInfo.name}</h1>
        <h2>${itemInfo.price}</h2>
      </div>
      <div className="div-top-right">
        <img src={deleteIcon} alt="x"></img>
      </div>
    </div>
  );
};

CheckoutRow.defaultProps = {
  itemInfo: {
    name: "Iphone 13",
    price: "750",
  },
};

CheckoutRow.propTypes = {
  itemInfo: PropTypes.object,
};
export default CheckoutRow;
