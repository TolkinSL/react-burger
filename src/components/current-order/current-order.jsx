import style from "./current-order.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect, disconnect} from "../../services/actions/websocket-slice";
import {getCookie} from "../../utils/cookie";
import {getIngredientsItems} from "../../utils/tools";
import {useLocation} from "react-router-dom";
import {getCurrentOrder} from "../../services/actions/order-slice";
import styles from "../burger-ingredients/burger-ingredients.module.css";

export const CurrentOrder = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ordersAll = useSelector(store => store.wsData.orders);
    const order = useSelector((store) => store.order.currentOrder);
    const burgerIngredients = useSelector(getIngredientsItems);
    const {id} = useParams();

    //const isClearLoaction = location?.state;
    // console.log('Location-------');
    // console.log(location);

    useEffect(() => {
        dispatch(getCurrentOrder(id));
    }, []);

    const totalPrice = order.ingredients?.reduce((acc, ritem) => {
        const temp = burgerIngredients.find(item => item._id === ritem);
        return acc += temp.price;
    }, 0);

    const itemIngredients = order.ingredients?.map((ritem) => {
        const temp = burgerIngredients.find(item => item._id === ritem);
        return temp;
    });

    // console.log('Item Ingredients--------');
    // console.log(itemIngredients);

    const mergedIngredients = itemIngredients?.reduce((acc, ingredient) => {
        const existingIngredient = acc.find(item => item._id === ingredient._id);
        if (existingIngredient) {
            existingIngredient.count += 1;
        } else {
            const newIngredient = {...ingredient, count: 1};
            acc.push(newIngredient);
        }

        return acc;
    }, []);

    // console.log('Merget Ingredients--------');
    // console.log(mergedIngredients);

    let orderStatus = '';
    if (order.status == 'done') {
        orderStatus = 'Выполнен';
    } else if (order.status == 'created') {
        orderStatus = 'Создан';
    } else if (order.status == 'pending') {
        orderStatus = 'Готовится';
    }

    return (
        order && burgerIngredients ? (
            <>
                <div className={style.main}>
                    <p className={`text text_type_digits-default mb-10 ${style.number}`}> {`#${order.number}`} </p>
                    <p className="text text_type_main-medium mb-3"> {order.name} </p>
                    <p className={`text_type_main-small ${style.status}`}>{orderStatus}</p>
                    <p className="text text_type_main-medium mb-6">Состав: </p>
                    <ul className={style.main__list}>
                        {mergedIngredients.map((item, index) => (
                                <li className={style.main__listItem} key={index}>
                                    <div className={style.main__items}>
                                        <div className={style.main__ingredient}>
                                            <img className={style.main__image} src={item.image}/>
                                            <p className="text text_type_main-small">{item.name}</p>
                                        </div>
                                        <div className={style.main__price + " text text_type_digits-default"}>
                                            <p className={style.main__numbers}>{item.count}&nbsp;x&nbsp;{item.price}&nbsp;</p>
                                            <CurrencyIcon type="primary"/>
                                        </div>
                                    </div>
                                </li>
                            )
                        )
                        }

                    </ul>
                    <div className={style.main__date}>
                        <FormattedDate className="text text_type_main-default text_color_inactive mr-6"
                                       date={new Date(order?.createdAt)}/>
                        <div className={style.price_container}>
                            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                            <CurrencyIcon/>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
    // return <p>Test</p>
};
