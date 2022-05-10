import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginComponent from './google/GoogleLoginComponent';

const WelcomeCard = ({updateUser}) => {
    return (
    <div className='generic-card welcome-card'>
        <h1>Find and Sell Books, Furniture, and Tech with Starflow</h1>
        <GoogleLoginComponent updateUser={updateUser} buttonText="Sign up with Google"/>
    </div>
    )
}

export default WelcomeCard