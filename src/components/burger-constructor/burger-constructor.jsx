import React from 'react';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import diamond from '../../images/diamond.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../../services/actions/order-slice';

import {addItem, resetItem} from "../../services/actions/constructor-slice";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {getBun, getMains} from "../../utils/tools";
import ConstructorMains from "../constructor-mains/constructor-mains";
import { useNavigate, useLocation } from "react-router-dom";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bunLocked = useSelector(getBun);
  const [isModalOrder, setModalOrder] = React.useState(false);
  const mains = useSelector(getMains);
  const isLogin = useSelector((store) => store.authorization.isLogin)

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addItem({...item, id4: uuidv4()}));
    },
  });

  const toLoginPage = () => {
    navigate("/login", {from: location })
  };

  const openModal = () => {
    if (Object.keys(bunLocked).length !== 0) {
      const cartItems = [];
      cartItems.push(bunLocked?._id);
      mains.forEach((item) => cartItems.push(item._id));
      cartItems.push(bunLocked?._id);
      dispatch(getOrder(cartItems));
      setModalOrder(true);
    }
  };

  const handleClose = () => {
    setModalOrder(false);
    dispatch(resetItem());
  };

  const orderSum = () => {
    let sum = 0;
    mains.forEach((item) => sum += item.price);
    sum += bunLocked?.price * 2;
    return sum ? sum : 0;
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
            // console.log('Constructor');
            // console.log(item);
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
          {/*<p className="text text_type_digits-medium">{orderSum()}<img className={`${styles.diamond} ml-2`}*/}
          {/*                                                             src={diamond}*/}
          {/*                                                             alt=""/></p>*/}
          <p className="text text_type_digits-medium">{orderSum()}<CurrencyIcon type="primary"/></p>
          <Button htmlType="button" type="primary" size="large" onClick={isLogin ? openModal : toLoginPage}>Оформить заказ</Button>
        </div>

        {isModalOrder && (
            <Modal closeModal={handleClose}>
              <OrderDetails/>
            </Modal>
        )}
      </section>
  );
}
