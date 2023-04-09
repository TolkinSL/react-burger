import React, {useContext} from 'react';
import {ConstructorElement, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import diamond from '../../images/diamond.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {UserContext} from "../../services/context";
import {getOrder} from "../../utils/api";


export default function BurgerConstructor() {
  const ingredients = useContext(UserContext);
  const [bunLocked] = ingredients.filter((item) => item.name === 'Краторная булка N-200i');
  const [isModalOrder, setModalOrder] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState();
  const mains = React.useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients]);

  const openModal = () => {
    let cartItems = [];
    cartItems.push(bunLocked?._id);
    mains.forEach((item) => cartItems.push(item));
    cartItems.push(bunLocked?._id);
    getOrder(cartItems)
        .then((data) => {
          setOrderNumber(data.order.number);
          setModalOrder(true);
        })
        .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setModalOrder(false);
  };

  const orderSum = () => {
    let sum = 0;
    mains.forEach((item) => sum += item.price);
    sum += bunLocked?.price * 2;
    return sum;
  }

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
          <p className="text text_type_digits-medium">{orderSum()}<img className={`${styles.diamond} ml-2`} src={diamond}
                                                              alt="Diamond"/></p>
          <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
        </div>

        {isModalOrder && (
            <Modal closeModal={handleClose}>
              <OrderDetails orderNumber={orderNumber}/>
            </Modal>
        )}
      </section>
  );
}
