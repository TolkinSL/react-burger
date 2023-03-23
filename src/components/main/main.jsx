import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import {itemsType} from "../../utils/types";
export default function Main({ingredients}) {

  return (
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(itemsType).isRequired,
}