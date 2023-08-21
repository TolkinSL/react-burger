import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import {Link, NavLink} from "react-router-dom";

export default function AppHeader() {
    return (
        <header>
            <nav className={styles.menu}>
                <ul className={styles.menuItem}>
                    <li>
                        <div className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                            <BurgerIcon type='primary'/>
                            <NavLink to='/' className={({isActive, isPending}) =>
                                isPending ? styles.link + " text text_type_main-default text_color_inactive" : isActive ? styles.active + " text text_type_main-default" : styles.link + " text text_type_main-default text_color_inactive"
                            }>
                                Конструктор
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <div className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                            <ListIcon type='secondary'/>
                            <NavLink to='/feed' className={({isActive, isPending}) =>
                                isPending ? styles.link + " text text_type_main-default text_color_inactive" : isActive ? styles.active + " text text_type_main-default" : styles.link + " text text_type_main-default text_color_inactive"
                            }>
                                Лента заказов
                            </NavLink>
                        </div>
                    </li>
                </ul>
                <div className={styles.logo}>
                    <Link to='/'><Logo /></Link>
                </div>
                <ul className={styles.menuItem}>
                    <li>
                        <div className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                            <ProfileIcon type='secondary'/>
                            <NavLink to='/profile' className={({isActive, isPending}) =>
                                isPending ? styles.link + " text text_type_main-default text_color_inactive" : isActive ? styles.active + " text text_type_main-default" : styles.link + " text text_type_main-default text_color_inactive"
                            }>
                                Личный кабинет
                            </NavLink>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}