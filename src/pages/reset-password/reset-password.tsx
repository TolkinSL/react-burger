import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import styles from "./reset-password.module.css";
import {PasswordInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPasswordApi} from "../../utils/api";
import useForm from "../../hooks/useForm";

import { FC, FormEvent } from 'react';

const ResetPassword = () => {
    const {values, handleChange} = useForm({password: "", token: ""});
    const navigate = useNavigate();
    const restorePass = localStorage.getItem('restorePass');

    React.useEffect(() => {
        if (!restorePass) {
            navigate('/forgot-password');
        }
    }, []);

    const submitForm = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        resetPasswordApi(values)
            .then((res) => {
                // console.log(values);
                // console.log(res);
                localStorage.removeItem('restorePass');
                navigate('/login');
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <h1 className="text_type_main-medium text ">Восстановление пароля</h1>
            <PasswordInput
                onChange={handleChange}
                placeholder={"Введите новый пароль"}
                value={values.password}
                name={"password"}
                extraClass="mt-6"
            />
            <Input
                onChange={handleChange}
                type={"text"}
                placeholder={"Введите код из письма"}
                value={values.token}
                name={"token"}
                extraClass="mb-6 mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium">
                Сохранить
            </Button>
            <div className="text text_type_main-default mt-20">
                <span className="text_color_inactive">Вспомнили пароль? </span>
                <Link to="/login" className={styles.link}> Войти</Link>
            </div>
        </form>
    );
}

export default ResetPassword;
