import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ItemDisplay = ({ itemInfo, cartItems, refreshItems }) => {
  const addItemToCart = async (e) => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .post(
        `${process.env.REACT_APP_BASE_BACKEND}/api/user/addCart/` +
          itemInfo._id,
        { itemId: itemInfo._id }
      )
      .catch((error) => {
        console.log(error.message);
      });
    refreshItems();
  };

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
    refreshItems();
  };

  return (
    <div className="item-display">
      {/* {console.log("IMAGE: " + itemInfo.image)} */}
      {itemInfo.image == null ? (
        <div className="item-img-size item-empty-image">
          <h1>
            NO <br />
            IMAGE
            <br /> FOUND
          </h1>
        </div>
      ) : (
        <image></image>
      )}
      <h2>{itemInfo.name}</h2>
      <h2>${itemInfo.price}</h2>
      <h3>Type: {itemInfo.type}</h3>
      <h3>Condition: {itemInfo.condition}</h3>
      <div className="item-btn-div">
        {/* Check if Items is in Cart, if it is do not allow user to reclick button */}

        {cartItems == null ? (
          <button className="btn" onClick={addItemToCart}>
            Add to Cart
          </button>
        ) : cartItems.includes(itemInfo._id) ? (
          <button className="btn-remove" onClick={removeItemFromCart}>
            Remove Item From Cart
          </button>
        ) : (
          <button className="btn" onClick={addItemToCart}>
            Add to Cart
          </button>
        )}

        <button className="btn-wishlist">Add to Wish List</button>
      </div>
    </div>
  );
};

ItemDisplay.defaultProps = {
  itemInfo: {
    name: "Iphone 13",
    condition: "Somewhat Used",
    type: "Electronics",
    price: "750",
    cartItems: [],
  },
};

ItemDisplay.propTypes = {
  itemInfo: PropTypes.object,
};

export default ItemDisplay;
