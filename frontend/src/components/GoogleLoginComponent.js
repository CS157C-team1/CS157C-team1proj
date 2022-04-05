import React from 'react'
import PropTypes from 'prop-types'
import GoogleLogin from 'react-google-login'
import axios from 'axios';

const GoogleLoginComponent = () => {
  
    const onSuccess = async (response) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_BACKEND}/auth/login`, 
            { token: response.tokenId},
            { withCredentials: true })
        } catch (e) {
            console.log(e)
        }
    }

    const onFailure = (response) => {
        console.log("Failure")
        console.log(response);
    }

    return (
        <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        buttonText="Log in With Google"
        onFailure={onFailure}
        onSuccess={onSuccess}
        render={(renderProps) => (
            <button type="button" onClick={renderProps.onClick} className='btn'>Sign up with Google</button>
        )}
    />
    )
}

export default GoogleLoginComponent