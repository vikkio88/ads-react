import React from 'react';
import {connect} from "react-redux";
import {Details} from "../components/user";

const ProfileView = ({status}) => (<Details {...status}/>);

const stateToProps = ({game}) => {
    const {status} = game;
    return {
        status
    };
};
const dispatchToProps = dispatch => {
    return {};
};
const Profile = connect(stateToProps, dispatchToProps)(ProfileView);
export {Profile};
