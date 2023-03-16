import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
export default function Main() {
  return (
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
  );
}