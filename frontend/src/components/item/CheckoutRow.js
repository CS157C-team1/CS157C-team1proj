import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import deleteIcon from "../../images/deleteX.png";

const CheckoutRow = ({ itemInfo, refreshCart }) => {
  const removeItemFromCart = async (e) => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .delete(
        `${process.env.REACT_APP_BASE_BACKEND}/api/user/deleteCart/` +
          itemInfo._id,
        { itemId: itemInfo._id }
      )
      .catch((error) => {
        console.log(error.message);
      });
    refreshCart();
  };

  return (
    <div className="checkout-row">
      {itemInfo.image === null || itemInfo.image === "" ? (
        <div className="checkout-img">
          <h1>
            NO <br />
            IMAGE
            <br /> FOUND
          </h1>
        </div>
      ) : (
        <img src={itemInfo.image} className="item-img-size" alt="itemImg"></img>
      )}
      <div className="item-info">
        <h1>{itemInfo.name}</h1>
        <h2>${itemInfo.price}</h2>
      </div>
      <div className="div-top-right">
        <img src={deleteIcon} alt="x" onClick={removeItemFromCart}></img>
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
