import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";
import {getUserData} from "../../services/actions/authorization-slice";
import {useNavigate} from "react-router";
import {authIsLogin, authUserData} from "../../utils/tools";

const ProtectedRouteElement = ({ children, anon  }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const user = useSelector(authUserData);
    const isLogin = useSelector(authIsLogin);

    React.useEffect(() => {
        if (isLogin) {
            dispatch(getUserData());
        }
    }, []);

    if (!anon && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    if (anon && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    return children;
}

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
    anon: PropTypes.bool,
    children: PropTypes.element.isRequired,
};