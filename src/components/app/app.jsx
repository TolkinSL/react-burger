import React from 'react';
import Main from '../../pages/main/main';
import {getIngredientsApi} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/ingredients-slice';
import {getIngredientsStatus} from "../../utils/tools";
import {Routes, Route, useLocation, useNavigate} from "react-router";
import Login from "../../pages/login/login";
import Layout from "../layout/layout";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileForm from "../profile-form/profile-form";
import Orders from "../orders/orders";
import Feed from "../../pages/feed/feed";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

function App() {
    const dispatch = useDispatch();
    const status = useSelector(getIngredientsStatus);
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getIngredients());
    }, []);

    const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(() => {
        getIngredientsApi()
            .then((data) => setIngredients(data.data))
            .catch((err) => console.error(err));
    }, []);

    if (status === 'load') return (<div>Data load...</div>);
    if (status === 'error') return (<div>Connection error...</div>);

    return (
        <>
            <Routes location={background ?? location}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path="login" element={<ProtectedRouteElement anon={true}><Login/></ProtectedRouteElement>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>}/>
                    <Route path="reset-password" element={<ResetPassword/>}/>
                    <Route path="profile" element={<ProtectedRouteElement anon={false}><Profile/></ProtectedRouteElement>}>
                        <Route index element={<ProfileForm/>}/>
                        <Route path="orders" element={<Orders/>}/>
                    </Route>
                    <Route path="feed" element={<ProtectedRouteElement anon={true}><Feed/></ProtectedRouteElement>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
