import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemDisplay = ({
  itemInfo,
  cartItems,
  wishItems,
  refreshCart,
  refreshWishList,
  displayType,
}) => {
  const [sellerInfo, setSellerInfo] = useState(null);

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

  const navigate = useNavigate();
  const ShowProduct = () => {
    let path = "/Product/" + itemInfo._id;
    navigate(path);
  };

  const showUser = () => {
    const path = "/userpage/" + sellerInfo._id;
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

  const getSellerInfo = async () => {
    const instance = axios.create({ withCredentials: true });
    instance
      .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserById`, {
        params: { userId: itemInfo.seller },
      })
      .then((res) => {
        setSellerInfo(res.data.userInfo);
      })
      .catch((error) => console.log(error.message));
  };

  const getButtons = () => {
    // If Item is sold, no Buttons just text
    if (itemInfo.sold == true) {
      return <h1>Item Sold</h1>;
      // Do not display buttons if item table is in posted or bought
    } else if (displayType != "posted" && displayType != "bought") {
      // Display buttons depending on if they are already in cart and 
      // wishlist
      if (cartItems == null || !cartItems.includes(itemInfo._id)) {
        if (wishItems == null || !wishItems.includes(itemInfo._id)) {
          return (
            <>
              <button className="btn" onClick={addItemToCart}>
                Add to Cart
              </button>
              <button className="btn-wishlist" onClick={addItemToWishList}>
                Add to Wishlist
              </button>
            </>
          );
        } else {
          return (
            <>
              <button className="btn" onClick={addItemToCart}>
                Add to Cart
              </button>
              <button
                className="btn-wishlist btn-remove"
                onClick={removeItemsFromWishList}
              >
                Remove from wishlist
              </button>
            </>
          );
        }
      } else {
        if (wishItems == null || !wishItems.includes(itemInfo._id)) {
          return (
            <>
              <button className="btn-remove" onClick={removeItemFromCart}>
                Remove From Cart
              </button>
              <button className="btn-wishlist" onClick={addItemToWishList}>
                Add to Wishlist
              </button>
            </>
          );
        } else {
          return (
            <>
              <button className="btn-remove" onClick={removeItemFromCart}>
                Remove From Cart
              </button>
              <button
                className="btn-wishlist btn-remove"
                onClick={removeItemsFromWishList}
              >
                Remove from wishlist
              </button>
            </>
          );
        }
      }
    }
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    getSellerInfo();
    console.log(displayType);
  }, []);

  return (
    sellerInfo != null && (
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
        <h2 className="item-display-name" onClick={ShowProduct}>
          {itemInfo.name}
        </h2>
        <div className="div-seller" onClick={showUser}>
          <img
            src={sellerInfo.profile_pic_url}
            alt="Seller Img"
            className="img-seller"
          ></img>
          <h2>
            {sellerInfo.first_name} {sellerInfo.last_name}
          </h2>
        </div>
        <h2>{currencyFormatter.format(itemInfo.price)}</h2>
        <h3>Type: {itemInfo.type}</h3>
        <h3>Condition: {itemInfo.condition}</h3>
        <div className="item-btn-div">{getButtons()}</div>
      </div>
    )
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
