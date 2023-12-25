import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import {useDrag} from "react-dnd";
import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {TIngredientList} from "../../utils/types";

function Ingredient({item, count, openModal}: TIngredientList) {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: item,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <li>
            <Link className={`${styles.link} ${styles.element} mb-8`}
                  to={`/ingredients/${item._id}`}
                  state={{background: location}}>
                <div className={`${styles.element} mb-8`} onClick={openModal} ref={dragRef}>
                    {count !== 0 ? <Counter count={count} size="default" extraClass="m-1"/> : ''}
                    <img className="mb-1" src={item.image} alt={item.name}/>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mb-1">{item.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.title} text text_type_main-default`}>{item.name}</p>
                </div>
            </Link>
        </li>
    );
}

export default Ingredient;
