import React, { useMemo } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./headerCart.scss";

const HeaderCard = () => {
    const navigate = useNavigate();
    const { cart } = useSelector(state => state.cart);
    const cartInfo = useMemo(() => {
        let prices = 0;
        let counts = 0;
        cart.map(item => {
            prices += (item.price*item.count);
            counts ++;
        }); 
        return { prices, counts }
    }, [cart])

    const setNavigate = () => {
        navigate(`/cart`)
    }

    return (
        <div className="header-cart">
            <button className="cart-btn" onClick={setNavigate}>
                <span className="cart-price">{cartInfo ? cartInfo.prices : 0} сум</span>
                <span className="cart-count">
                    <span className="cart-icon">
                        <FaShoppingCart />
                    </span>
                    <div className="cart-count-text">{cartInfo ? cartInfo.counts : 0}</div>
                </span>
            </button>
        </div>
    );
}

export default React.memo(HeaderCard);