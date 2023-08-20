import {connect, disconnect} from "../../services/actions/websocket-slice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/cookie";

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.wsData.orders);
    const token = getCookie("accessToken").split(' ')[1];
    //const connect = () => dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
    //const disconnect = () => dispatch(disconnect());
    console.log('WsOrder');
    console.log(orders);

    useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token}`));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);

    return (
      <>
          <p>Заказы</p>
      </>
    );
};

export default Orders;