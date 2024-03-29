import styles from "./ingredient-details.module.css";
import {useSelector} from 'react-redux';
// import {getIngredientItem, getIngredientsItems} from "../../utils/tools";
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function IngredientDetails() {

    const {id} = useParams();
    const ingredients = useAppSelector((state)  => state.ingredients.items);
    const item = ingredients.find(item => item._id === id);

    if (id && item) {

        return (
            <section className={`${styles.container} pt-10 pb-15`}>
                <div className={styles.title}>
                    <h2 className="text text_type_main-large">Детали ингредиента</h2>
                </div>
                <img src={item.image_large} alt={item.name}/>
                <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
                <ul className={`${styles.items}`}>
                    <li className={styles.item}>
                        <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{item.calories}</p>
                    </li>
                    <li className={styles.item}>
                        <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{item.proteins}</p>
                    </li>
                    <li className={styles.item}>
                        <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{item.fat}</p>
                    </li>
                    <li className={styles.item}>
                        <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{item.carbohydrates}</p>
                    </li>
                </ul>
            </section>
        );
    } else {
        return null;
    }
}
