import React from 'react';
import {ConstructorElement, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../utils/data';
import styles from './burger-constructor.module.css';
import diamond from '../../images/diamond.svg';
import Modal from '../modal/modal';

export default function BurgerConstructor() {
  const bunLocked = data.filter((item) => item.name === 'Краторная булка N-200i');

  const [isModalOrder, setModalOrder] = React.useState(false);

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
              text={bunLocked[0].name + ' (верх)'}
              price={bunLocked[0].price}
              thumbnail={bunLocked[0].image}
          />
        </div>
        <ul className={styles.ingredients}>
          {data.map(item => {
            if (item.type !== 'bun') {
              return (
                  <li className={`${styles.ingredient} mb-4`} key={item._id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}/>
                  </li>
              )
            }
          })}
        </ul>
        <div className="ml-8">
          <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunLocked[0].name + ' (низ)'}
              price={bunLocked[0].price}
              thumbnail={bunLocked[0].image}
          />
        </div>
        <div className={`${styles.price} mt-10 mr-4`}>
          <p className="text text_type_digits-medium">610<img className={`${styles.diamond} ml-2`} src={diamond}
                                                              alt="Diamond"/></p>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
        </div>

        {isModalOrder && (
            <Modal closeModal={handleClose}>
              <h2>Test Modal Constructor</h2>
            </Modal>
        )}
      </section>
  );
}