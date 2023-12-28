import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from "react-router-dom";
// import {authIsLogin} from "../../utils/tools";
import {TProtected} from "../../utils/types";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const FreeRouteElement = ({children}: TProtected) => {
    const isLogin = useAppSelector((state) => state.authorization.isLogin);
    return ( !isLogin ? children : <Navigate to='/'/> );
};

export default FreeRouteElement;