import React from 'react';
import { Cart, ModalCart } from '../../components';
import "./cartPage.scss";

const CartPage = () => {
    return (
        <div className="cart">

            <Cart />
            <ModalCart />

        </div>
    )
}

export default CartPage;