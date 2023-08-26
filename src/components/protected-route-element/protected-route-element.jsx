import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";
import {getUserData} from "../../services/actions/authorization-slice";
import {useNavigate} from "react-router";
import {authIsLogin, authUserData} from "../../utils/tools";

const ProtectedRouteElement = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const user = useSelector(authUserData);
    const isLogin = useSelector(authIsLogin);
    const error = useSelector((state) => state.authorization.error);

    React.useEffect(() => {
        dispatch(getUserData());
    }, []);

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

ProtectedRouteElement.propTypes = {
    anon: PropTypes.bool,
    children: PropTypes.element.isRequired,
};