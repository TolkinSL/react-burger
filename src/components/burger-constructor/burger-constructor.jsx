import React from 'react';
import {ConstructorElement, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import diamond from '../../images/diamond.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import {itemsType} from '../../utils/types';


export default function BurgerConstructor({ingredients}) {
  const [bunLocked] = ingredients.filter((item) => item.name === 'Краторная булка N-200i');
  const [isModalOrder, setModalOrder] = React.useState(false);
  const mains = React.useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients]);

  const openModal = () => {
    setModalOrder(true);
  };

  const handleClose = () => {
    setModalOrder(false);
  };

  return (
      <section className="pt-25 pl-4">
        <div className="ml-8">
          <ConstructorElement
              type="top"
              isLocked={true}
              text={bunLocked ? bunLocked.name + ' (верх)' : ''}
              price={bunLocked ? bunLocked.price : ''}
              thumbnail={bunLocked ? bunLocked.image : ''}
          />
        </div>
        <ul className={styles.ingredients}>
          {mains.map(item => {
              return (
                  <li className={`${styles.ingredient} mb-4`} key={item._id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}/>
                  </li>
              )
          })}
        </ul>
        <div className="ml-8">
          <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunLocked ? bunLocked.name + ' (верх)' : ''}
              price={bunLocked ? bunLocked.price : ''}
              thumbnail={bunLocked ? bunLocked.image : ''}
          />
        </div>
        <div className={`${styles.price} mt-10 mr-4`}>
          <p className="text text_type_digits-medium">610<img className={`${styles.diamond} ml-2`} src={diamond}
                                                              alt="Diamond"/></p>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
        </div>

        {isModalOrder && (
            <Modal closeModal={handleClose}>
              <OrderDetails />
            </Modal>
        )}
      </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(itemsType).isRequired,
}