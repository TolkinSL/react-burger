import React from 'react';
import {ConstructorElement, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-mains.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, removeItem, moveItem} from "../../services/actions/constructor-slice";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
// import {getCartItems} from "../../utils/tools";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {TConstrMains, TDrop} from "../../utils/types";

function ConstructorMains({ingredient, index}: TConstrMains) {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const ingredients = useAppSelector((state) => state.cart.items);

  const removeItemId = (id4: string) => {
    dispatch(removeItem(id4));
  }

  const [, drag] = useDrag({
    type: "mains",
    item: {ingredient, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: "mains",
    drop(item: TDrop) {
      dropItem(item);
    },
  });

  const dropItem = (item: TDrop) => {
    // console.log('Drop')
    // console.log(item)
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    moveIngredient(dragIndex, hoverIndex);
    item.index = hoverIndex;
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = ingredients[dragIndex];
    dispatch(moveItem({ dragIndex, hoverIndex, dragIngredient }));
  };

  drag(drop(ref));

  return (
      <li className={`${styles.ingredient} mb-4`} ref={ref}>
        <DragIcon type="primary"/>
        <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => removeItemId(ingredient.id4)}/>
      </li>
  );
}

export default ConstructorMains;