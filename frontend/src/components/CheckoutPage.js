import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CheckoutRow from "./CheckoutRow";

const CheckoutPage = ({}) => {
  const [cartItems, setCartItems] = useState([]);

  // Gets Object Ids of items of user in cart
  const getItemsInCart = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getCart`, {
          withCredentials: true,
        })
        .then((res) => {
          // Get Actual Item Collection
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
        });
    } catch (error) {}
  };

  useEffect(() => {
    getItemsInCart();
  }, []);

  return (
    <>
      <h1>Checkout Page: </h1>
      {Object.keys(cartItems).map((index) => {
        return <CheckoutRow itemInfo={cartItems[index]}></CheckoutRow>;
      })}
      <CheckoutRow></CheckoutRow>
      <CheckoutRow></CheckoutRow>
    </>
  );
};

export default CheckoutPage;
