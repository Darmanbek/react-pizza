import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyCart } from "../../../assets"
import "./cartClean.scss";

const CartClean = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/")
    }
    return (
        <div className="cart-clean flex-center">
            <div className="clean_block">
                <h1>Корзина пустая</h1>
                <div className="clean-desc">
                    <span>Вероятней всего, вы не заказывали ещё пиццу.</span>
                    <span>Для того, чтобы заказать пиццу, перейди на главную страницу.</span>
                </div>
                <div className="clean-img">
                    <img src={EmptyCart} alt="Empty-cart.png" />
                </div>
                <button className="clean-btn" onClick={handleNavigate}><span>Вернуться назад</span></button>
            </div>
        </div>
    )
}

export default React.memo(CartClean);