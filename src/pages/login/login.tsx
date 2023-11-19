import React from "react";
import {useDispatch} from "react-redux";
import {Link, Navigate} from 'react-router-dom';
import {redirect, useLocation, useNavigate} from "react-router";
import styles from "./login.module.css";
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginRequest} from "../../services/actions/authorization-slice";
import useForm from "../../hooks/useForm";

import { FC, FormEvent } from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {values, handleChange} = useForm({email: "", password: ""});
    const from = location.state?.from;
    // console.log('login-----');
    // console.log(from);

    const submitForm = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(loginRequest(values));
        // console.log('Redirect login');
        // console.log(from);
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <h1 className="text_type_main-medium text ">Вход</h1>
            <EmailInput
                onChange={handleChange}
                value={values.email}
                // type={"email"}
                name={"email"}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mt-6"
            />
            <PasswordInput
                onChange={handleChange}
                value={values.password}
                name={"password"}
                extraClass="mb-6 mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium">Войти</Button>
            <div className="text text_type_main-default mt-20">
                <span className="text_color_inactive">Вы - новый пользователь? </span>
                <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
            </div>
            <div className="text text_type_main-default mt-4">
                <span className="text_color_inactive">Забыли пароль? </span>
                <Link to="/forgot-password" className={styles.link}> Восстановить пароль</Link>
            </div>
        </form>
    );
};

export default Login;
