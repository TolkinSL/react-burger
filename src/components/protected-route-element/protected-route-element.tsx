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

const ProtectedRouteElement: FC<TProtected> = ({children, anonymous = false}) => {

    const isLoggedIn = useAppSelector((state) => state.authorization.isLogin);

    const location = useLocation();
    const from = location.state?.from || '/';

    console.log('isLoggedIn');
    console.log(isLoggedIn);

    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
};


export default ProtectedRouteElement;
