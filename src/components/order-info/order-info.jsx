import React from "react";
import {useSelector} from "react-redux";
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-info.module.css';
import {useLocation} from "react-router-dom";
import {getIngredientsItems} from "../../utils/tools";

const OrderInfo = (props) => {
    const location = useLocation();

    const orderIngredients = props.order.ingredients;
    const burgerIngredients = useSelector(getIngredientsItems);
    console.log('Order-------');
    //console.log(ingredientsAll);
    const totalPrice = orderIngredients.reduce((acc, ritem) => {
        const temp = burgerIngredients.find(item => item._id === ritem);
        return acc += temp.price;
    }, 0);
    const imageIngredients = orderIngredients.map((ritem) => {
        const temp = burgerIngredients.find(item => item._id === ritem);
        return temp.image_mobile;
    }).slice(0, 7);

    let orderStatus = '';
    if (props.order.status == 'done') {
        orderStatus = <p className={style.status_done + " text text_type_main-default"}>Выполнен</p>;
    } else if (props.order.status == 'created') {
        orderStatus = <p className={style.status + " text text_type_main-default"}>Создан</p>;
    } else if (props.order.status == 'pending') {
        orderStatus = <p className={style.status + " text text_type_main-default"}>Готовится</p>;
    }

    //{order.status == 'done' ? <p className={style.status_done + " text text_type_main-default"}>Выполнен</p> : order.status == 'created' ? <p className={style.status + " text text_type_main-default"}>Создан</p> : <p className={style.status + " text text_type_main-default"}>Готовится</p>}
    //console.log(props.order);

    return (
        <li>
            <div className={style.order}>
                <div className={style.order__number}>
                    <p className="text text_type_digits-default">{`#${props.order.number}`}</p>
                    <p className="text text_type_main-small text_color_inactive">{<FormattedDate
                        date={new Date(props.order.createdAt)}/>}</p>
                </div>
                <div>
                    <h2 className={style.order__name + " text text_type_main-medium"}>{props.order.name}</h2>
                    {props.currentUser ? orderStatus : null}
                </div>
                <div className={style.order__info}>
                    <div className={style.ingredients}>
                        {
                            imageIngredients.map((item, index) => <img className={style.order__image} src={item}
                                                                       key={index}/>)
                        }
                    </div>
                    <div className={style.order__price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </li>
        // </Link>
    )
}

export default OrderInfo;