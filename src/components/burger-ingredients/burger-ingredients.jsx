import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css';
import data from '../../utils/data';

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one')
  return (
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={`${styles.tabs} mb-8`}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredients}>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {data.map((item) => {
                if (item.type === 'bun') {
                  return <Ingredient {...item} key={item._id}/>
                }
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {data.map((item) => {
                if (item.type === 'sauce') {
                  return <Ingredient {...item} key={item._id}/>
                }
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium">Начинки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {data.map((item) => {
                if (item.type === 'main') {
                  return <Ingredient {...item} key={item._id}/>
                }
              })}
            </ul>
          </div>
        </div>
      </section>
  );
}