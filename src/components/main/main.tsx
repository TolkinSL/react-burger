import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
export default function Main() {
  return (
      <main className={styles.main}>
        <BurgerIngredients />
        <h2>Constructor</h2>
      </main>
  );
}