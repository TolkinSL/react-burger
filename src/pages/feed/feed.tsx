import {connect, disconnect} from "../../services/actions/websocket-slice";
import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
import style from './feed.module.css';
import OrderInfo from "../../components/order-info/order-info";
import {TwsOrder} from "../../utils/types";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Feed = () => {
    const dispatch = useAppDispatch();
    const orders: TwsOrder[] = useAppSelector(store => store.wsData.orders);
    const ordersAll = useAppSelector(store => store.wsData.total);
    const ordersToday = useAppSelector(store => store.wsData.totalToday);
    // console.log('WsOrder');
    // console.log(orders);

    useEffect(() => {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(disconnect());
        }
    }, []);

    const doneOrders = orders && orders.filter(item => item.status === 'done').slice(0, 20);
    const pendingOrders = orders && orders.filter(item => item.status === 'pending').slice(0, 20);

    return (
        <>
            <main className={style.main}>
                <h1 className="text text_type_main-large">Лента заказов</h1>
                <div className={style.main__section}>
                    <section className={style.main__orders}>
                        <ul className={style.order__list}>
                            {orders.map((order) => {
                                return (
                                    <OrderInfo order={order} currentUser={false} key={order.number}/>
                                );
                            })}
                        </ul>
                    </section>
                    <section className={style.orders}>
                        <div className={style.order__numbers}>
                            <div>
                                <p className="text text_type_main-medium">Готовы:</p>
                                <div className={style.done_orders}>
                                    {doneOrders.map((order, index) => <p className={style.done_order + " text text_type_digits-default"} key={index} >{order.number}</p>)}
                                </div>
                            </div>
                            <div>
                                <p className="text text_type_main-medium">В работе:</p>
                                {pendingOrders && pendingOrders.map((order, index) => <p className=" text text_type_digits-default" key={index} >{order.number}</p>)}
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">Выполнено за все время:</p>
                            <p className="text text_type_digits-large">{ordersAll}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                            <p className="text text_type_digits-large">{ordersToday}</p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Feed;