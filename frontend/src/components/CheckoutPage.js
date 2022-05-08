import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CheckoutRow from "./CheckoutRow";

const CheckoutPage = ({}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Gets Object Ids of items of user in cart
  const getItemsInCart = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getCart`, {
          withCredentials: true,
        })
        .then((res) => {
          // Get Actual Item Collection information
          getItemInfo(res.data.cartItems);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Gets actual item information from item collection from obj ids
  const getItemInfo = async (listOfObjIds) => {
    try {
      const instance = axios.create({ withCredentials: true });
      await instance
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getItemsByIds`, {
          params: { listOfItemObjIds: listOfObjIds }, // TODO: Not sure why params is needed here
        })
        .then((res) => {
          setCartItems(res.data.cartItemData);
          setTotalPrice(res.data.totalPrice);
          console.log(cartItems);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getItemsInCart();
  }, []);

  return (
    <>
      {cartItems == null || cartItems.length == 0 ? (
        <div className="checkout-page-div-left">
          <h1>Checkout Page: </h1>
          <h2>No Items In Cart</h2>
        </div>
      ) : (
        <>
          <div className="checkout-page-div-left">
            <h1>Checkout Page: </h1>
            {Object.keys(cartItems).map((index) => {
              return <CheckoutRow itemInfo={cartItems[index]}></CheckoutRow>;
            })}
          </div>
          <div className="checkout-page-div-right">
            <h1>Order Summary</h1>
            <div>
              <div className="div-title">
                <h2>Items ({cartItems.length}):</h2>
              </div>
              <div className="div-number">
                <h2>${totalPrice}</h2>
              </div>
            </div>
            <div>
              <div className="div-title">
                <h2>Estimated Taxes (15%):</h2>
              </div>
              <div className="div-number">
                <h2>${totalPrice * 0.15}</h2>
              </div>
            </div>
            <div>
              <div className="div-title">
                <h1>Total:</h1>
              </div>
              <div className="div-number">
                <h1>${totalPrice + totalPrice * 0.15}</h1>
              </div>
            </div>
            <button className="btn">Checkout</button>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
