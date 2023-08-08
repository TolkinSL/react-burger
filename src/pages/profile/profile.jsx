import {useDispatch} from "react-redux";
import styles from "./profile.module.css";
import {Outlet, NavLink, Link} from "react-router-dom";
import {logoutRequest} from "../../services/actions/authorization-slice";
import {useNavigate} from "react-router";

export function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        dispatch(logoutRequest());
        navigate("/", { replace: true });
    }

    return (
        <div className={styles.main}>
            <nav className={`${styles.nav} pr-15`}>
                <ul className={styles.items}>
                    <li className={styles.item}>
                        <NavLink to="/profile"
                            className={({isActive, isPending}) =>
                                isPending ? styles.link + " text text_type_main-medium text_color_inactive" : isActive ? styles.linkActive + " text text_type_main-medium" : styles.link + " text text_type_main-medium text_color_inactive"
                            } end>
                            Профиль
                        </NavLink>
                    </li>
                    <li className={`${styles.item}`}>
                        <NavLink to="/profile/orders"
                            className={({isActive, isPending}) =>
                                isPending ? styles.link + " text text_type_main-medium text_color_inactive" : isActive ? styles.linkActive + " text text_type_main-medium" : styles.link + " text text_type_main-medium text_color_inactive"
                            } end>
                            История заказов
                        </NavLink>
                    </li>
                    <li className={`${styles.item}`}>
                        <Link to="/login" onClick={logout} className={styles.link + " text text_type_main-medium text_color_inactive"}>Выход</Link>
                    </li>
                </ul>
                <p
                    className={`${styles.description} text text_type_main-default text_color_inactive pt-20 pb-4`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Profile;
