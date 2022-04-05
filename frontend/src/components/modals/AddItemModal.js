import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const AddItemModal = ({ showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Sell</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form action="">
          <label htmlFor="itemName">
            Item Name: <br />
            <input type="text" id="itemName" name="itemName" />
          </label>
          <br />
          <label htmlFor="itemPrice">
            Price: <br /> <input type="text" id="itemPrice" name="itemPrice" />
          </label>
          <br />
          <label htmlFor="itemType">
            Type: <br /> <input type="text" id="itemType" name="itemType" />
          </label>
          <br />
          <label htmlFor="itemCondition">
            Condition: <br />
            <input type="text" id="itemCondition" name="itemCondition" />
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
