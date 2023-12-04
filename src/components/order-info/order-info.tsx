import React from "react";
import {FC} from "react";
import {useSelector} from "react-redux";
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-info.module.css';
import {Link, useLocation} from "react-router-dom";
import {getIngredientsItems} from "../../utils/tools";
import ImageContainer from "../image-container/image-container";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {TIngredient, TwsOrder} from "../../utils/types";

type TProps = {
    order: TwsOrder,
    currentUser: boolean,
}

const OrderInfo: FC<TProps> = ({order, currentUser}) => {
    const location = useLocation();
    const orderIngredients = order.ingredients;
    const burgerIngredients: TIngredient[] = useAppSelector(getIngredientsItems);
    // console.log(burgerIngredients);
    // console.log('Order-------');
    //console.log(ingredientsAll);

    const totalPrice = orderIngredients.reduce((acc, ritem) => {
        const temp: TIngredient | undefined = burgerIngredients.find(item => item._id === ritem);
        // return acc += temp?.price;
        return acc += temp ? temp.price : 0;
    }, 0);
    const imageIngredients = orderIngredients.map((ritem) => {
        const temp: TIngredient | undefined = burgerIngredients.find(item => item._id === ritem);
        return temp?.image_mobile;
    });

    // const imageIngredients = orderIngredients.map((ritem) => {
    //     const temp = burgerIngredients.find(item => item._id === ritem);
    //     return temp.image_mobile;
    // }).slice(0, 7);

    let orderStatus: JSX.Element | string = "";
    if (order.status == 'done') {
        orderStatus = <p className={style.status_done + " text text_type_main-default"}>Выполнен</p>;
    } else if (order.status == 'created') {
        orderStatus = <p className={style.status + " text text_type_main-default"}>Создан</p>;
    } else if (order.status == 'pending') {
        orderStatus = <p className={style.status + " text text_type_main-default"}>Готовится</p>;
    }

    const routing = location.pathname === '/feed' ? '/feed/' : '/profile/orders/';
    // console.log('История заказов-------');
    // console.log(location);
    return (
        <li>
            <Link to={`${routing}${order.number}`} state={{background: location}} className={style.link}>
                <div className={style.order}>
                    <div className={style.order__number}>
                        <p className="text text_type_digits-default">{`#${order.number}`}</p>
                        <p className="text text_type_main-small text_color_inactive">{<FormattedDate
                            date={new Date(order.createdAt)}/>}</p>
                    </div>
                    <div>
                        <h2 className={style.order__name + " text text_type_main-medium"}>{order.name}</h2>
                        {currentUser ? orderStatus : null}
                    </div>
                    <div className={style.order__info}>
                        <div className={style.ingredients}>
                            {/*{*/}
                            {/*    imageIngredients.map((item, index) => <img className={style.order__image} src={item} key={index}/>)*/}
                            {/*}*/}
                            <ImageContainer image={imageIngredients}/>
                        </div>
                        <div className={style.order__price}>
                            <p className="text text_type_digits-default">{totalPrice}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
        // </Link>
    )
}

export default OrderInfo;