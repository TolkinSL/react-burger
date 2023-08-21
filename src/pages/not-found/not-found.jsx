import {Link} from "react-router-dom";
import styles from "./not-found.module.css";

const NotFound = () => {
    return (
        <div className={styles.main}>
            <h1 className="text text_type_main-medium">404 - Страница не найдена</h1>
            <Link to="/" className={styles.link}>
                Вернуться на главную страницу
            </Link>
        </div>
    );
};

export default NotFound;
