import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";

const ItemTable = () => {
  const [listOfItems, setListOfItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  const getItems = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getAllItems`, {
          withCredentials: true,
        })
        .then((res) => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const getItemsInWishList = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getWishList`, {
          withCredentials: true,
        })
        .then((res) => {
          setWishItems(res.data.wishListItems);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getItems();
    getItemsInCart();
    getItemsInWishList();
  }, []);

  return (
    <div className="item-table">
      {Object.keys(listOfItems).map((index) => {
        return (
          <ItemDisplay
            itemInfo={listOfItems[index]}
            cartItems={cartItems}
            wishItems={wishItems}
            refreshCart={getItemsInCart}
            refreshWishList={getItemsInWishList}
          />
        );
      })}
    </div>
  );
};

export default ItemTable;
