import {connect, disconnect} from "../../services/actions/websocket-slice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './feed.module.css';
import OrderInfo from "../../components/order-info/order-info";

const Feed = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.wsData.orders);
    const ordersAll = useSelector(store => store.wsData.total);
    const ordersToday = useSelector(store => store.wsData.totalToday);
    // console.log('WsOrder');
    // console.log(orders);

    useEffect(() => {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);

    return (
        <>
            <main className={style.main}>
                <h1 className="text text_type_main-large">Лента заказов</h1>
                <div className={style.main__section}>
                    <section className={style.main__orders}>
                        <ul className={style.order__list}>
                            {orders.map((order) => {
                                return (
                                    <OrderInfo order={order} key={order.number}/>
                                );
                            })}
                        </ul>
                    </section>
                    <section className={style.orders}>
                        <div className={style.order__numbers}>
                            <div>
                                <h2 className="text text_type_main-medium">Готовы:</h2>
                            </div>
                            <div>
                                <h2 className="text text_type_main-medium">В работе:</h2>
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