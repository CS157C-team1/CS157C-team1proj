import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const AddItemModal = ({ showModal, setShowModal }) => {
  const [itemType, setItemType] = useState("Book")

  const addItem = async (event) => {
    event.preventDefault()
    const formElements = document.getElementById('itemForm').elements
    // console.log(formElements)
    let newItem = { sold: false }
    for (let i = 0; i < formElements.length; i++) {
      // console.log(formElements[i].name + ": " + formElements[i].value)
      const field = formElements[i].name
      const value = formElements[i].value
      if (field !== "") {
        newItem[field.toString()] = value
      }
      // console.log(newItem)
    }
    console.log(newItem)
    const instance = axios.create({ withCredentials: true })
    setShowModal(false)
    await instance.post(`${process.env.REACT_APP_BASE_BACKEND}/api/item/addItem`, newItem)
      .then(() => {
        setShowModal(false)
      })
  }

  const getFields = () => {
    if (itemType === "Book") {
      return (
        <>
          <label htmlFor="author">
            Author: <br />
            <input type="text" id="author" name="author" />
          </label>
          <br />
          <label htmlFor="page">
            Pages: <br />
            <input type="text" id="page" name="page" />
          </label>
          <br />
        </>
      )
    } else if (itemType === "Furniture") {
      return (
        <>
          <label htmlFor="weight">
            Weight: <br />
            <input type="text" id="weight" name="weight" />
          </label>
          <br />
          <label htmlFor="dimension">
            Dimension: <br />
            <input type="text" id="dimension" name="dimension" />
          </label>
          <br />
        </>
      )
    } else {
      return (<></>)
    }

  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Sell</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="itemForm" onSubmit={addItem}>
          <label htmlFor="name">
            Item Name: <br />
            <input type="text" id="name" name="name" />
          </label>
          <br />
          <label htmlFor="image">
            Image Url: <br />
            <input type="text" id="image" name="image" />
          </label>
          <br />
          <label htmlFor="price">
            Price: <br /> <input type="text" id="price" name="price" />
          </label>
          <br />
          <label htmlFor="type">
            Type:
            <br />
            <select id="type" name="type" onChange={(e) => setItemType(e.target.value)}>
              <option selected value="Book">Book</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Accessory">Accessory</option>
            </select>
          </label>
          <br />
          {getFields()}
          <label htmlFor="condition">
            Condition: <br />
            <input type="text" id="condition" name="condition" />
          </label>
          <label htmlFor="description">
            Description: <br />
            <textarea type="text" id="description" name="description" rows="4" cols="50" />
          </label>
          <br /> <br />
          <input className="btn" type="submit" value="Submit" />
        </form>
      </Modal.Body>
    </Modal>
  )
};

AddItemModal.defaultProps = {
  showModal: false,
  setShowModal: () => null,
};

AddItemModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default AddItemModal;
