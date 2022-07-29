import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyCart } from '../../assets';
import "./notFoundPage.scss";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    }

    return (
        <section className="section-error">
            <div className="container">
                <div className="error_block flex-center">
                    <h1>Не найдена страница</h1>
                    <div className="error-desc">
                        <span>Вероятней всего, вы не попали не туда.</span>
                        <span>Для того, чтобы заказать пиццу, перейди на главную страницу.</span>
                    </div>
                    <div className="error-img">
                        <img src={EmptyCart} alt="Empty-cart.png" />
                    </div>
                    <button className="error-btn" onClick={handleNavigate}><span>Вернуться на Главную</span></button>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage