import styles from "./order-details.module.css";
import complete from '../../images/complete.png';

export default function OrderDetails() {
  return (
      <section className={`${styles.container} pt-30 pb-30 pl-25 pr-25`}>
        <p className={`${styles.number} text text_type_digits-large mb-8`}>034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img className={styles.image} src={complete} alt={'complete'}/>
        <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </section>
  )
}