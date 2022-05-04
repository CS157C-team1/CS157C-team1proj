import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ItemDisplay from "./ItemDisplay";

const ItemTable = () => {
  const [listOfItems, setListOfItems] = useState([]);
  const getItems = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getAllItems`, {
          withCredentials: true,
        })
        .then((res) => {
        //   console.log(res);
          setListOfItems(res.data.itemArray);
        });
      // console.log(listOfItems);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  
  return (
    <div className="item-table">
      {Object.keys(listOfItems).map((index) => {
        return <ItemDisplay itemInfo={listOfItems[index]} />;
      })}
    </div>
  );
};

export default ItemTable;
