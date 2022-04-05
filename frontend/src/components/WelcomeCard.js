import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginComponent from './GoogleLoginComponent';

const WelcomeCard = () => {
    return (
    <div className='generic-card welcome-card'>
        <h1>Find and Sell Books, Furniture, and Tech with Starflow</h1>
        <GoogleLoginComponent />
    </div>
    )
}

export default WelcomeCard