import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from "react-router-dom";
import {authIsLogin} from "../../utils/tools";

const FreeRouteElement = ({children}) => {
    const isLogin = useSelector(authIsLogin);
    return ( !isLogin ? children : <Navigate to='/'/> );
};

export default FreeRouteElement;