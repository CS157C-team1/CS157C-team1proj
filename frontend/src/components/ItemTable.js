import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";

const ItemTable = () => {
  const [listOfItems, setListOfItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getItems = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getAllItems`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res)
          setListOfItems(res.data.itemArray);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getItemsInCart = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getCart`, {
          withCredentials: true,
        })
        .then((res) => {
          setCartItems(res.data.cartItems);
        });
      console.log("Cart Items: " + cartItems);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getItems();
    getItemsInCart();
  }, []);

  return (
    <div className="item-table">
      {Object.keys(listOfItems).map((index) => {
        return (
          <ItemDisplay
            itemInfo={listOfItems[index]}
            cartItems={cartItems}
            refreshItems={getItemsInCart}
          />
        );
      })}
    </div>
  );
};

export default ItemTable;
