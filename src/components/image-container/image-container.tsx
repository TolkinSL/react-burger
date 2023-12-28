import style from './image-container.module.css';
import React from "react";
import {FC} from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {TwsOrder} from "../../utils/types";

type TImage = {
    image: string[],
}

const ImageContainer: FC<TImage> = ({image}) => {
    const count = image.length;
    const newArr = image.slice(0, 5);
    return count > 6 ? (
        <>
            {newArr.map((item, index) => (
                <img className={style.order__image} src={item} key={index} />
            ))}
            <span className={`${style.text} text text_type_main-medium`}>{`+${count - 6}`}</span>
        </>
    ) : (
        <>
            {newArr.map((item, index) => (
                <img className={style.order__image} src={item} key={index} />
            ))}
        </>
    );
}

export default ImageContainer;