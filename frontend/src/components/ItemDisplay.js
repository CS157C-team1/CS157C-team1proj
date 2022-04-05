import React from "react";
import PropTypes from "prop-types";

const ItemDisplay = ({ itemInfo }) => {
    return(
        <div className="item-display">
            {console.log("IMAGE: " + itemInfo.image)}
            {itemInfo.image == null ? (
               <div className="item-img-size item-empty-image">
                   <h1>NO <br/>IMAGE<br/> FOUND</h1>
               </div> 
            ) : (
                <image></image>
            )}
            <h2>{itemInfo.name}</h2>
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
