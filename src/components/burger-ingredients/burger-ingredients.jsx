import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css';
import data from '../../utils/data';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  const [currentItem, setCurrentItem] = React.useState({});
  const [isModalIngredients, setModalIngredients] = React.useState(false);

  const openModal = (item) => {
    setModalIngredients(true);
    setCurrentItem(item);
    console.log(item);
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
              {data.map((item) => {
                if (item.type === 'bun') {
                  return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
                }
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {data.map((item) => {
                if (item.type === 'sauce') {
                  return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
                }
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Начинки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {data.map((item) => {
                if (item.type === 'main') {
                  return <Ingredient {...item} key={item._id} openModal={() => openModal(item)}/>
                }
              })}
            </ul>
          </div>
        </div>

        {isModalIngredients && (
            <Modal closeModal={handleClose}>
              <IngredientDetails item={currentItem} />
            </Modal>
        )}
      </section>
  );
}