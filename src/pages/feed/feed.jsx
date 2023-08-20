import {connect, disconnect} from "../../services/actions/websocket-slice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const Feed = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.wsData.orders);
    //const connect = () => dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
    //const disconnect = () => dispatch(disconnect());
    console.log('WsOrder');
    console.log(orders);

    useEffect(() => {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(disconnect());
        }
    }, [dispatch]);

    return (
      <>
          <p>Лента Заказов</p>
      </>
    );
};

export default Feed;