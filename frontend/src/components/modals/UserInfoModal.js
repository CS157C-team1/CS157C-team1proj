import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const UserInfoModal = ({ userInfo, showModal, setShowModal, refreshUser }) => {

    const editUser = async (event) => {
        event.preventDefault()
        const formElements = document.getElementById('userForm').elements

        let editUserInfo = {}
        for (let i = 0; i < formElements.length; i++) {

            const field = formElements[i].name
            const value = formElements[i].value
            if (field !== "") {
                if (value !== "") {
                    editUserInfo[field.toString()] = value
                } else {
                    editUserInfo[field.toString()] = formElements[i].placeholder
                }
            }
        }
        // console.log(editUserInfo)

        const instance = axios.create({ withCredentials: true })
        await instance.put(`${process.env.REACT_APP_BASE_BACKEND}/api/user/editUserInfo`, editUserInfo)
        refreshUser()
        setShowModal(false)
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="userForm" onSubmit={editUser}>
                    <label htmlFor="first_name">
                        First Name: <br />
                        <input type="text" id="first_name" name="first_name" placeholder={userInfo.first_name} />
                    </label>
                    <br />
                    <label htmlFor="last_name">
                        Last Name: <br />
                        <input type="text" id="last_name" name="last_name" placeholder={userInfo.last_name} />
                    </label>
                    <br />
                    <label htmlFor="profile_pic_url">
                        Profile Picture Url: <br />
                        <textarea type="text" id="profile_pic_url" name="profile_pic_url" rows="3" cols="50" placeholder={userInfo.profile_pic_url} />
                    </label>
                    <br />
                    <label htmlFor="email">
                        Email: <br />
                        <input type="text" id="email" name="email" size="30" placeholder={userInfo.email} />
                    </label>
                    <br />
                    <label htmlFor="university">
                        University: <br />
                        <input type="text" id="university" name="university" placeholder={userInfo.university} />
                    </label>
                    <br /> <br />
                    <input className="btn" type="submit" value="Edit" />
                </form>
            </Modal.Body>
        </Modal>
    )
};

UserInfoModal.defaultProps = {
    showModal: false,
    setShowModal: () => null,
};

UserInfoModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
};

export default UserInfoModal;
