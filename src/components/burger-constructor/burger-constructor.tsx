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
// import {getBun, getMains} from "../../utils/tools";
import ConstructorMains from "../constructor-mains/constructor-mains";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {TIngredient} from "../../utils/types";

export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const bunLocked = useAppSelector((state) => state.cart.bun);
  const [isModalOrder, setModalOrder] = React.useState(false);
  const mains = useAppSelector((state) => state.cart.items);
  const isLogin = useAppSelector((store) => store.authorization.isLogin)

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      dispatch(addItem({...item, id4: uuidv4()}));
    },
  });

  const toLoginPage = () => {
    //navigate("/login", {from: location })
    navigate("/login", { state: { from: location } });
  };

  const openModal = () => {
    if (Object.keys(bunLocked).length !== 0) {
      const cartItems = [];
      cartItems.push(bunLocked?._id);
      mains.forEach((item: TIngredient) => cartItems.push(item._id));
      cartItems.push(bunLocked?._id);
      dispatch(getOrder(cartItems as string[]));
      setModalOrder(true);
    }
  };

  const handleClose = () => {
    setModalOrder(false);
    dispatch(resetItem());
  };

  const orderSum = () => {
    let sum = 0;
    mains.forEach((item: TIngredient) => sum += item.price);
    if (bunLocked && typeof bunLocked.price === 'number') {
      sum += bunLocked.price * 2;
    }

    return sum ? sum : 0;
  }

  return (
      <section className="pt-25 pl-4" ref={dropTarget}>
        <div className="ml-8">
          <ConstructorElement
              type="top"
              isLocked={true}
              text={Object.keys(bunLocked).length ? bunLocked.name + ' (верх)' : 'Добавьте булку !'}
              price={bunLocked ? bunLocked.price as number : 0}
              thumbnail={bunLocked ? bunLocked.image as string : ''}
          />
        </div>
        <ul className={styles.ingredients}>
          {mains.map((item: TIngredient, index: number) => {
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
              price={bunLocked ? bunLocked.price as number : 0}
              thumbnail={bunLocked ? bunLocked.image as string : ''}
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
