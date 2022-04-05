import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

const WelcomeCard = () => {
    return (
    <div className='generic-card welcome-card'>
        <h1>Find and Sell Books, Furniture, and Tech with Starflow</h1>
        <GoogleLogin />
    </div>
    )
}

export default WelcomeCard