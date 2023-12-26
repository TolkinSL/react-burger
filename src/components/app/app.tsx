import React from 'react';
import Main from '../../pages/main/main';
//import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/ingredients-slice';
// import {getIngredientsStatus} from "../../utils/tools";
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
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {getUserData} from "../../services/actions/authorization-slice";
import NotFound from "../../pages/not-found/not-found";
import CurrentOrder from "../current-order/current-order";
import FreeRouteElement from "../free-route-element/free-route-element";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.ingredients.status);
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUserData());
    }, []);

    const handleModalClose = () => {
        navigate(-1);
    };

    if (status === 'load') return (<div>Data load...</div>);
    if (status === 'error') return (<div>Connection error...</div>);

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path="login" element={<FreeRouteElement><Login/></FreeRouteElement>}/>
                    <Route path="register" element={<FreeRouteElement><Register/></FreeRouteElement>}/>
                    <Route path="forgot-password" element={<FreeRouteElement><ForgotPassword/></FreeRouteElement>}/>
                    <Route path="reset-password" element={<FreeRouteElement><ResetPassword/></FreeRouteElement>}/>
                    <Route path="profile" element={<ProtectedRouteElement><Profile/></ProtectedRouteElement>}>
                        <Route index element={<ProfileForm/>}/>
                        <Route path="orders" element={<Orders/>}/>
                    </Route>
                    <Route path="feed" element={<Feed/>}/>
                    <Route path="feed/:id" element={<CurrentOrder/>}/>
                    <Route path="ingredients/:id" element={<IngredientDetails/>}/>
                    <Route path='profile/orders/:id'
                           element={<ProtectedRouteElement><CurrentOrder/></ProtectedRouteElement>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path='ingredients/:id'
                           element={
                               <Modal closeModal={handleModalClose}>
                                   <IngredientDetails/>
                               </Modal>
                           }
                    />
                    <Route path='feed/:id'
                           element={
                               <Modal closeModal={handleModalClose}>
                                   <CurrentOrder/>
                               </Modal>
                           }
                    />
                    <Route path='profile/orders/:id'
                           element={<ProtectedRouteElement>
                               <Modal closeModal={handleModalClose}>
                                   <CurrentOrder/>
                               </Modal>
                           </ProtectedRouteElement>
                           }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
