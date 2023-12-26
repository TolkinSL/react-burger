import React from 'react';
import { FC, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import {getUserData} from "../../services/actions/authorization-slice";
import {useNavigate} from "react-router";
// import {authIsLogin, authUserData} from "../../utils/tools";
import {TProtected} from "../../utils/types";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const ProtectedRouteElement: FC<TProtected> = ({children}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.authorization.userData);
    const isLogin = useAppSelector((state) => state.authorization.isLogin);
    const error = useAppSelector((state) => state.authorization.error);

    React.useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);


    if (!user) {
        if (error) {
            return <Navigate to="/login"/>;
        } else {
            return null;
        }
    } else {
        if (isLogin) {
            return children;
        } else {
            return <Navigate to="/login"/>;
        }
    }
};


export default ProtectedRouteElement;
