import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

export default function Ingredient(props) {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: props.item,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <li>
            <Link className={`${styles.link} ${styles.element} mb-8`}
                  to={`/ingredients/${props.item._id}`}
                  state={{background: location}}>
                <div className={`${styles.element} mb-8`} onClick={props.openModal} ref={dragRef}>
                    {props.count !== 0 ? <Counter count={props.count} size="default" extraClass="m-1"/> : ''}
                    <img className="mb-1" src={props.item.image} alt={props.item.name}/>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mb-1">{props.item.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.title} text text_type_main-default`}>{props.item.name}</p>
                </div>
            </Link>
        </li>
        // <li className={`${styles.element} mb-8`} onClick={props.openModal} ref={dragRef}>
        //     <Link className={`${styles.link} ${styles.element} mb-8`}
        //         to={`/ingredients/${props.item._id}`}
        //         state={{ background: location }} >
        //   {props.count !==0 ? <Counter count={props.count} size="default" extraClass="m-1" /> : ''}
        //   <img className="mb-1" src={props.item.image} alt={props.item.name}/>
        //   <div className={styles.price}>
        //     <p className="text text_type_digits-default mb-1">{props.item.price}</p>
        //     <CurrencyIcon type="primary"/>
        //   </div>
        //   <p className={`${styles.title} text text_type_main-default`}>{props.item.name}</p>
        // </Link>
        // </li>
    );
}

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    // name: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
    // image: PropTypes.string.isRequired,
    // openModal: PropTypes.func.isRequired,
};