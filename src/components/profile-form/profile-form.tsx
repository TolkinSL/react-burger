// import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Button, Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import useForm from "../../hooks/useForm";
import {updateUserRequest} from "../../services/actions/authorization-slice";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {FormEvent} from "react";
import {TFetchData} from "../../utils/types";

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userData} = useAppSelector((store) => store.authorization);

    const {values, handleChange, setValues} = useForm({
        name: userData.name,
        email: userData.email,
        password: '',
    });

    const submitForm = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(updateUserRequest(values));
        setValues({ ...values,
            password: '',
        });
    };

    const reset = () => {
        setValues({
            email: userData.email,
            name: userData.name,
            password: '',
        });
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <Input
                onChange={handleChange}
                value={values.name}
                type={"text"}
                placeholder={"Имя"}
                name={"name"}
                error={false}
                icon="EditIcon"
            />
            <EmailInput
                onChange={handleChange}
                value={values.email}
                name={"email"}
                placeholder="Логин"
                // icon={"EditIcon"}
                extraClass="mt-6"
            />
            <PasswordInput
                onChange={handleChange}
                value={values.password}
                name={"password"}
                extraClass="mb-6 mt-6"
            />
            {values.name && values.email && values.password && (
                <div className={styles.buttons}>
                    <Button
                        onClick={reset}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass="pr-7"
                    >
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}

export default ProfileForm;
