import {connect, disconnect} from "../../services/actions/websocket-slice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/cookie";
import style from "../../components/orders/orders.module.css";
import OrderInfo from "../order-info/order-info";

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.wsData.orders);
    const token = getCookie("accessToken").split(' ')[1];

    useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token}`));
        return () => {
            dispatch(disconnect());
        }
    }, []);

    return (
      <>
          <section className={style.main__orders}>
              <ul className={style.order__list}>
                  {orders?.map((order) => {
                      return (
                          <OrderInfo order={order} currentUser={true} key={order.number}/>
                      );
                  })}
              </ul>
          </section>
      </>
    );
};

export default Orders;