import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import styles from "./forgot-password.module.css";
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {restorePasswordApi} from "../../utils/api";
import useForm from "../../hooks/useForm";

const ForgotPassword = () => {
    const {values, handleChange} = useForm({email: ""});
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        restorePasswordApi(values)
            .then((res) => {
                // console.log(res);
                localStorage.setItem('restorePass', '1');
                navigate('/reset-password');
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <h1 className="text_type_main-medium text ">Восстановление пароля</h1>
            <EmailInput
                onChange={handleChange}
                value={values.email}
                type={"email"}
                name={"email"}
                placeholder="Укажите e-mail"
                isIcon={false}
                extraClass="mt-6 mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
                Восстановить
            </Button>
            <div className="text text_type_main-default mt-20">
                <span className="text_color_inactive">Вспомнили пароль? </span>
                <Link to="/login" className={styles.link}> Войти</Link>
            </div>
        </form>
    );
}

export default ForgotPassword;
