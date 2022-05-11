import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";

const ItemTable = ({ userInfo, displayUserArray }) => {
  const [listOfItems, setListOfItems] = useState([]); //Items displayed to the User
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  // Get Items For Display in Home Page
  const getItemsForDisplay = async () => {
    try {
      const instance = axios.create({ withCredentials: true });
      await instance
        .get(
          `${process.env.REACT_APP_BASE_BACKEND}/api/item/getItemsForDisplay`
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
        params: { userId: userInfo._id },
      })
      .then((res) => {
        setListOfItems(res.data.itemsPosted);
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
    if (displayUserArray === "display") {
      getItemsForDisplay();
      getItemsInCart();
      getItemsInWishList();
    } else if (displayUserArray === "posted") {
      getItemsPosted();
    }
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
