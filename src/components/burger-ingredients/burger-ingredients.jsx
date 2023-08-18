import React, {useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from "react-intersection-observer";
import Ingredient from "../ingredient/ingredient";
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useDispatch, useSelector} from 'react-redux';
import {setItemIngredient} from '../../services/actions/ingredient-slice';
import {getIngredientsItems, getCartBun, getCartItems} from "../../utils/tools";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');
  const [bunRef, bunView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceView] = useInView({ threshold: 0.1 });
  const [mainRef, mainView] = useInView({ threshold: 0.1 });
  const [isModalIngredients, setModalIngredients] = React.useState(false);
  const ingredients = useSelector(getIngredientsItems);
  const buns = React.useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = React.useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const mains = React.useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunCart = [useSelector(getCartBun)];
  const mainsCart = useSelector(getCartItems);

  const dispatch = useDispatch();

  const ingredientScroll = () => {
    switch (true) {
      case bunView:
        setCurrent("bun");
        break;
      case sauceView:
        setCurrent("sauce");
        break;
      case mainView:
        setCurrent("main");
        break;
      default:
        break;
    }
  };

  const tabClick = (type) => {
    setCurrent(type);
    const section = document.getElementById(type);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    ingredientScroll();
  }, [bunView, sauceView, mainView]);

  const openModal = (item) => {
    dispatch(setItemIngredient(item));
    setModalIngredients(true);
  };

  const handleClose = () => {
    setModalIngredients(false);
    dispatch(setItemIngredient({}));
  };

  const countCart = (ingredient, cart) => {
    const count = cart.reduce((acc, item) => {
          if (item._id === ingredient._id) {
            ingredient.type !== 'bun' ? acc += 1 : acc += 2 ;
          }
          return acc;
        },
        0);
    return count;
  }

  return (
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={`${styles.tabs} mb-8`}>
          <Tab value="bun" active={current === 'bun'} onClick={() => tabClick("bun")}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => tabClick("sauce")}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={() => tabClick("main")}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredients}>
          <div className="mt-2">
            <h2 className="text text_type_main-medium" ref={bunRef} id="bun">Булки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {buns.map((item) => {
                return <Ingredient item={item} key={item._id} openModal={() => openModal(item)} count={countCart(item, bunCart)}/>
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium" ref={sauceRef} id="sauce">Соусы</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {sauces.map((item) => {
                return <Ingredient item={item} key={item._id} openModal={() => openModal(item)} count={countCart(item,mainsCart)}/>
              })}
            </ul>
          </div>
          <div className="mt-2">
            <h2 className="text text_type_main-medium" ref={mainRef} id="main">Начинки</h2>
            <ul className={`${styles.ingredient} pt-6 pl-4`}>
              {mains.map((item) => {
                  return <Ingredient item={item} key={item._id} openModal={() => openModal(item)} count={countCart(item,mainsCart)}/>
              })}
            </ul>
          </div>
        </div>
      </section>
  );
}
