import React, {useEffect, useState} from 'react';
import cl from './PageForm.module.css'
import InputMask from 'react-input-mask';
import {useLocation, useNavigate} from "react-router-dom";
import {useFetching} from "../../Hooks/useFetching";
import {buyCertificates} from "../../API/APICertificates";
const PageForm = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const chosen = location.state || {};

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        message: '',
        email: '',
    });

    const [responseAPI, setResponseAPI] = useState()
    const [errors, setErrors] = useState({});

    const [fetchData, , , isDone] = useFetching(async (certificate, formData) => {
        const response = await buyCertificates(certificate, formData)
        setResponseAPI(response)
    })

    const validatePhone = (phone) => {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'ФИО обязательно для заполнения.';
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона.';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Введите корректный email.';
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            fetchData(chosen, formData)
        }
    };

    useEffect(() => {

        if (responseAPI?.result === 0) navigate('/done')
    }, [isDone]);


    return (
        <div className={cl.container}>
            <div className={cl.window}>
                <form className={cl.form} onSubmit={handleSubmit}>
                    <h1>{chosen.NAME}</h1>
                    <label>
                        ФИО *
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Введите ФИО..."
                        />
                        {errors.fullName && <span className={cl.error}>{errors.fullName}</span>}
                    </label>

                    <label>
                        Телефон *
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+7 (___) ___-__-__"
                        >
                            {(inputProps) => <input {...inputProps} type="text" name="phone"/>}
                        </InputMask>
                        {errors.phone && <span className={cl.error}>{errors.phone}</span>}
                    </label>

                    <label>
                        Сообщение
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Введите сообщение..."
                        />
                    </label>

                    <label>
                        Почта *
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Введите email..."
                        />
                        {errors.email && <span className={cl.error}>{errors.email}</span>}
                    </label>
                    <div className={cl.buttons}>
                        <button onClick={() => navigate('/')} type="button">Назад</button>
                        <button onClick={handleSubmit} type="submit">Отправить</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PageForm;