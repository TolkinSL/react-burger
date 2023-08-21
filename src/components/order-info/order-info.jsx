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