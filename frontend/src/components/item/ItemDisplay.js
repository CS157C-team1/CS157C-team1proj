import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ItemDisplay = ({
  itemInfo,
  cartItems,
  wishItems,
  refreshCart,
  refreshWishList,
}) => {
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
    refreshCart();
  };

  let navigate = useNavigate();
  const ShowProduct = () => {
    let path = '/Product/' + itemInfo._id;
    navigate(path);
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
    refreshCart();
  };

  const addItemToWishList = async (e) => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .post(
        `${process.env.REACT_APP_BASE_BACKEND}/api/user/addWish/` +
          itemInfo._id,
        { itemId: itemInfo._id }
      )
      .catch((error) => {
        console.log(error.message);
      });
    refreshWishList();
  };

  const removeItemsFromWishList = async (e) => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .delete(
        `${process.env.REACT_APP_BASE_BACKEND}/api/user/deleteWish/` +
          itemInfo._id,
        { itemId: itemInfo._id }
      )
      .catch((error) => {
        console.log(error.message);
      });
    refreshWishList();
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
      <h2 className="item-display-name" onClick={ShowProduct}>{itemInfo.name}</h2>
      <h2>${itemInfo.price}</h2>
      <h3>Type: {itemInfo.type}</h3>
      <h3>Condition: {itemInfo.condition}</h3>
      <div className="item-btn-div">
        {/* If item is already sold, do not display buttons */}
        {itemInfo.sold === true ? (
          <h1>Item Already Sold</h1>
        ) : (
          /* Check if Items is in Cart, if it is change button type */
          <>
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

            {/* Check if Items is in Cart, if it is change button type */}
            {wishItems == null ? (
              <button className="btn-wishlist" onClick={addItemToWishList}>
                Add to WishList
              </button>
            ) : wishItems.includes(itemInfo._id) ? (
              <button
                className="btn-wishlist btn-remove"
                onClick={removeItemsFromWishList}
              >
                Remove Item From WishList
              </button>
            ) : (
              <button className="btn-wishlist" onClick={addItemToWishList}>
                Add to WishList
              </button>
            )}
          </>
        )}
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
    wishItems: [],
  },
};

ItemDisplay.propTypes = {
  itemInfo: PropTypes.object,
};

export default ItemDisplay;
