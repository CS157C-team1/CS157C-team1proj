import React from "react";
import PropTypes from "prop-types";
import ProductPage from "./ProductPage";
import {useNavigate} from "react-router-dom";

const ItemDisplay = ({ itemInfo }) => {

  let navigate = useNavigate();
  const ShowProduct = () => {
    let path = '/Product/' + itemInfo._id;
    navigate(path);
  };

    return(
        <div className="item-display">
            {itemInfo.image == null ? (
               <div className="item-img-size item-empty-image">
                   <h1>NO <br/>IMAGE<br/> FOUND</h1>
               </div> 
            ) : (
                <image></image>
            )}
            <h2 className="item-display-name" onClick={ShowProduct}>{itemInfo.name}</h2>
            <h2>${itemInfo.price}</h2>
            <h3>Type: {itemInfo.type}</h3>
            <h3>Condition: {itemInfo.condition}</h3>
        </div>
    )   
};

ItemDisplay.defaultProps = {
  itemInfo: {
    name: "Iphone 13",
    condition: "Somewhat Used",
    type: "Electronics",
    price: "750",
  },
};

ItemDisplay.propTypes = {
  itemInfo: PropTypes.object,
};

export default ItemDisplay;
