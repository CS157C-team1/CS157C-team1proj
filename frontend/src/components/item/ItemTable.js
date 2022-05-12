import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";
import { useRef } from "react";

const ItemTable = ({ userInfo, displayUserArray }) => {
  const [listOfItems, setListOfItems] = useState([]); //Items displayed to the User
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  let query = useRef(null);
  let type = useRef(null);

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

  // Only Get Obj Ids of Items Posted By User Logged in
  const getObjIdsInCart = async () => {
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

  // Only Get Obj Ids of wishlisted items of User logged in
  const getObjIdsInWishList = async () => {
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

  const searchItems = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/searchItems/`, {
          params: {input: query, type: type},
          withCredentials: true,
        })
        .then((res) => {
          setListOfItems(res.data.itemData);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getItemInfoInWishList = async () => {
    try {
      const instance = axios.create({ withCredentials: true });
      await instance
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getWishList`, {
          params: { userId: userInfo._id },
        })
        .then((res) => {
          setListOfItems(res.data.wishList);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBoughtItems = async () => {
    try {
      const instance = axios.create({ withCredentials: true });
      await instance
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getItemsBought`, {
          params: { userId: userInfo._id },
        })
        .then((res) => {
          setListOfItems(res.data.itemsBought);
          console.log(listOfItems);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Display item for logged in user
    if (displayUserArray === "display") {
      getObjIdsInCart();
      getObjIdsInWishList();
      getItemsForDisplay();
      // Display items posted by user
    } else if (displayUserArray === "posted") {
      getItemsPosted();
      // Display wishlist of user
    } else if (displayUserArray === "wishlist") {
      getObjIdsInCart();
      getObjIdsInWishList();
      getItemInfoInWishList();
    } else if (displayUserArray === "bought") {
      getBoughtItems();
    }
  }, [wishItems]);

  return (
    <>
      {listOfItems == null || listOfItems.length == 0 ? (
        <h1>No Items to display</h1>
      ) : (
        <>
            {/* TODO: Search Bar */}
          <div className ="searchBar">
            <form>
              <input type="text" placeholder="Search" onInput={e=> query = e.target.value} />
              <input type="button" value="Search" onClick={searchItems}/>
            </form>
          </div>
          <div className= "filter">
          <form>
              <input type="radio" name="type" id="Book" onClick={e=> type = e.target.id}/>
              <label for="Book">Book</label><br/>
              <input type="radio" name="type" id="Furniture" onClick={e=> type = e.target.id}/>
              <label for="Furniture">Furniture</label><br/>
              <input type="radio" name="type" id="Electronics" onClick={e=> type = e.target.id}/>
              <label for="Electronics">Electronics</label><br/>
              <input type="radio" name="type" id="Entertainment" onClick={e=> type = e.target.id}/>
              <label for="Entertainment">Entertainment</label><br/>
              <input type="radio" name="type"  id="Accessory" onClick={e=> type = e.target.id}/>
              <label for="Accessory">Accessory</label><br/>
            </form>
          </div>
          <div className="item-table">
            {Object.keys(listOfItems).map((index) => {
              return (
                <ItemDisplay
                  itemInfo={listOfItems[index]}
                  cartItems={cartItems}
                  wishItems={wishItems}
                  refreshCart={getObjIdsInCart}
                  refreshWishList={getObjIdsInWishList}
                  displayType={displayUserArray}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ItemTable;
