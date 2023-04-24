import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import React from "react";

export default function Ingredient(props) {

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.item,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
      <li className={`${styles.element} mb-8`} onClick={props.openModal} ref={dragRef}>
        {props.count !==0 ? <Counter count={props.count} size="default" extraClass="m-1" /> : ''}
        <img className="mb-1" src={props.item.image} alt={props.item.name}/>
        <div className={styles.price}>
          <p className="text text_type_digits-default mb-1">{props.item.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.title} text text_type_main-default`}>{props.item.name}</p>
      </li>
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