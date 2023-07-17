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

function App() {
    const dispatch = useDispatch();
    const status = useSelector(getIngredientsStatus);
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background;

    // console.log(useSelector(state => state));

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
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
