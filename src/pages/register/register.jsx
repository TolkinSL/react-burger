import React from "react";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import styles from "./register.module.css";
import {Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { registerRequest} from "../../services/actions/authorization-slice";
import useForm from "../../hooks/useForm";

export function Register() {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({name: "", email: "", password: ""});
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(registerRequest(values));
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-medium pl-1">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          extraClass="mt-6"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          type={"email"}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          type={"password"}
          name={"password"}
          extraClass="mb-6 mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className="text text_type_main-default text_color_inactive pt-20 pb-4">
          <span className="text_color_inactive">Уже зарегистрированы? </span>
          <Link to='/login' className={styles.link}> Войти</Link>
        </div>
      </form>
    </>
  );
}

export default Register;
