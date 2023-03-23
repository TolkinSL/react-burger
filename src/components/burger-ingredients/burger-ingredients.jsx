import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {itemsType} from "../../utils/types";

export default function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = React.useState('bun');
  const [currentItem, setCurrentItem] = React.useState({});
  const [isModalIngredients, setModalIngredients] = React.useState(false);
  const buns = React.useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = React.useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const mains = React.useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const openModal = (item) => {
    setModalIngredients(true);
    setCurrentItem(item);
  };

  const handleClose = () => {
    setModalIngredients(false);
  };

  return (
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={`${styles.tabs} mb-8`}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredients}>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {buns.map((item) => {
                return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {sauces.map((item) => {
                  return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Начинки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {mains.map((item) => {
                  return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
              })}
            </ul>
          </div>
        </div>

        {isModalIngredients && (
            <Modal closeModal={handleClose}>
              <IngredientDetails item={currentItem}/>
            </Modal>
        )}
      </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(itemsType).isRequired,
}