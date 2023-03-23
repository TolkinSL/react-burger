import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';

export default function Ingredient({image, price, name, openModal}) {
  return (
      <li className={`${styles.element} mb-8`} onClick={openModal}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img className="mb-1" src={image} alt={name}/>
        <div className={styles.price}>
          <p className="text text_type_digits-default mb-1">{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${styles.title} text text_type_main-default`}>{name}</p>
      </li>
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};