import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";

const ItemTable = () => {
  const [listOfItems, setListOfItems] = useState([]); //Items displayed to the User
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  // Convert Obj Ids to actual Item information
  const getItemsForDisplay = async (itemsPosted) => {
    if (itemsPosted.length === 0) {
      itemsPosted = false;
    }

    try {
      const instance = axios.create({ withCredentials: true });
      await instance
        .get(
          `${process.env.REACT_APP_BASE_BACKEND}/api/item/getItemsForDisplay`,
          {
            params: { listOfitemObjIds: itemsPosted },
          }
        )
        .then((res) => {
          setListOfItems(res.data.itemData);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Only Get Obj Ids of Items Posted By User
  const getItemsPosted = async () => {
    const instance = axios.create({ withCredentials: true });
    await instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getItemsPosted`, {
        withCredentials: true,
      })
      .then((res) => {
        getItemsForDisplay(res.data.itemsPosted);
      })
      .catch((error) => console.log(error.message));
  };

  // Only Get Obj Ids of Items Posted By User
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

  // Only Get Obj Ids of Items Posted By User
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
  };

  useEffect(() => {
    getItemsPosted();
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
