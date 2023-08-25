import style from './image-container.module.css';
import React from "react";
import styles from "../burger-constructor/burger-constructor.module.css";

const ImageContainer = (props) => {
    const count = props.image.length;
    const newArr = props.image.slice(0, 5);
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