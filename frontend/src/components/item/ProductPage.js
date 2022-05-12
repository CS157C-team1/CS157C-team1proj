import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = (itemInfo) => {
    let {id} = useParams();
    const [list, setList] = useState([]);
    const getItem = async (id) => {
        try {
            await axios
                .get(`${process.env.REACT_APP_BASE_BACKEND}/api/item/getItem/` + id, {
                withCredentials: true,
                })
                .then((res) => {
                    setList(res.data.itemArray);
                });
        } catch (error) {
            console.log(error.message);
        }
    };

    const [userInfo, setUserInfo] = useState([]);
    const getUserInfo = async (id) => {
        const instance = axios.create({ withCredentials: true });
        instance
            .get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/getUserById`, {
            params: { userId: id },
            })
            .then((res) => {
            setUserInfo(res.data.userInfo);
            })
            .catch((error) => console.log(error.message));
    };

    const navigate = useNavigate();
    const showUser = () => {
        const path = "/userpage/" + userInfo._id;
        navigate(path);
      };

    useEffect(() => {
        getItem(id);
        getUserInfo(list['seller']);
      });
    
    return(
        <div className="item-display" id="productcard">
            {list.image == null ? (
               <div className="item-img-size item-empty-image" id="productimg">
                   <h1 >NO <br/>IMAGE<br/> FOUND</h1>
               </div> 
            ) : (
                <image></image>
            )}
            {Object.keys(list).filter((index) => index !== "_id" && index !== "seller" && index !== "sold").map((index) => {
                return <h3>{index[0].toUpperCase() + index.slice(1)}: {list[index]}</h3>;
             })}
            <h3 onClick={showUser} style={{cursor: 'pointer'}}>Seller: {userInfo.first_name + " " + userInfo.last_name}</h3>
        </div>
    )   
};

ProductPage.defaultProps = {
  itemInfo: {
    name: "Iphone 13",
    condition: "Somewhat Used",
    type: "Electronics",
    price: "750",
  },
};

ProductPage.propTypes = {
  itemInfo: PropTypes.object,
};

export default ProductPage;
