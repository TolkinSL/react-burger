import React from 'react';
import {ConstructorElement, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import diamond from '../../images/diamond.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../../services/actions/order-slice';

import {addItem, resetItem} from "../../services/actions/constructor-slice";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';

import ConstructorMains from "../constructor-mains/constructor-mains";

export default function BurgerConstructor() {
  const bunLocked = useSelector((state) => state.cart.bun);
  const [isModalOrder, setModalOrder] = React.useState(false);
  const mains = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addItem({...item, id4: uuidv4()}));
    },
  });

  const openModal = () => {
    let cartItems = [];
    cartItems.push(bunLocked?._id);
    mains.forEach((item) => cartItems.push(item));
    cartItems.push(bunLocked?._id);
    dispatch(getOrder(cartItems));
    setModalOrder(true);
  };

  const handleClose = () => {
    setModalOrder(false);
    dispatch(resetItem());
  };

  const orderSum = () => {
    let sum = 0;
    mains.forEach((item) => sum += item.price);
    sum += bunLocked?.price * 2;
    return sum;
  }

  return (
      <section className="pt-25 pl-4" ref={dropTarget}>
        <div className="ml-8">
          <ConstructorElement
              type="top"
              isLocked={true}
              text={Object.keys(bunLocked).length ? bunLocked.name + ' (верх)' : 'Добавьте булку !'}
              price={Object.keys(bunLocked).length ? bunLocked.price : ''}
              thumbnail={Object.keys(bunLocked).length ? bunLocked.image : ''}
          />
        </div>
        <ul className={styles.ingredients}>
          {mains.map((item, index) => {
            return (
                <ConstructorMains ingredient={item} index={index} key={item.id4}/>
            )
          })}
        </ul>
        <div className="ml-8">
          <ConstructorElement
              type="bottom"
              isLocked={true}
              text={Object.keys(bunLocked).length ? bunLocked.name + ' (низ)' : 'Добавьте булку !'}
              price={Object.keys(bunLocked).length ? bunLocked.price : ''}
              thumbnail={Object.keys(bunLocked).length ? bunLocked.image : ''}
          />
        </div>
        <div className={`${styles.price} mt-10 mr-4`}>
          <p className="text text_type_digits-medium">{orderSum()}<img className={`${styles.diamond} ml-2`}
                                                                       src={diamond}
                                                                       alt="Diamond"/></p>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
        </div>

        {isModalOrder && (
            <Modal closeModal={handleClose}>
              <OrderDetails/>
            </Modal>
        )}
      </section>
  );
}
