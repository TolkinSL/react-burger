import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
      <header>
        <nav className={styles.menu}>
          <ul className={styles.menuItem}>
            <li>

              <a href="#" className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                <BurgerIcon type='primary'/>
                <p className="text text_type_main-default">Конструктор</p>
              </a>
            </li>
            <li>
              <a href="#" className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                <ListIcon type='secondary'/>
                <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
              </a>
            </li>
          </ul>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <ul className={styles.menuItem}>
            <li>
              <a href="#" className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
                <ProfileIcon type='secondary'/>
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
              </a>
            </li>
          </ul>
        </nav>
      </header>
  );
}