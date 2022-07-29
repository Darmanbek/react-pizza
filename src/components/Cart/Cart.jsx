import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartClean from "./CartClean/CartClean";
import CartItem from "./CartItem/CartItem";
import SkeletonCartItem from './SkeletonCartItem/SkeletonCartItem';
import { deleteAllCartProduct } from '../../store/cartSlice/cartSlice';
import { handleID, handleVisibleCart } from '../../store/modalSlice/modalSlice';
import api from '../../api';
import "./cart.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector(state => state.cart);
    const { visibleCart, selectID } = useSelector(state => state.modal);
    const [selectCounts, setSelectCounts] = useState(0);
    const [selectPrices, setSelectPrices] = useState(0);
    const [errorSelect, setErrorSelect] = useState(false)
    const [selectId, setSelectId] = useState([]);

    const array = [1, 2, 3, 4];

    const handleCart = (number, price, id, method) => {
        setSelectCounts(prev => prev + number);
        setSelectPrices(prev => prev + price);
        if (method === "add") {
            const newCart = cart.find(item => item.id === id);
            if (newCart) {
                setSelectId(prev => [...prev, newCart.id]);
            }
        }
        if (method === "remove") {
            const newSelectId = selectId.filter(item => item !== id);
            setSelectId(newSelectId);
        }
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const clearAllCart = async () => {
        dispatch(deleteAllCartProduct());
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            await api.delete(`/cartProducts/${item.id}`);
            delay(1000);
        }
    }

    const visibleModalCart = useCallback(() => {
        if (selectCounts !== 0 || selectPrices !== 0) {
            setErrorSelect(false);
            dispatch(handleVisibleCart());
            dispatch(handleID(selectId));
        } else {
            setErrorSelect(true);
        }
    }, [selectCounts],
    );

    useEffect(() => {
        setSelectId(selectID);
    }, [selectID])


    useEffect(() => {
        if (visibleCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visibleCart]);

    return (
        <section className="section-cart">
            <div className="container">
                <div className="cart-inner">

                    {loading === "pending" && array.map((_, i) => (
                        <SkeletonCartItem key={i} />
                    ))}

                    {cart.length > 0 && loading === "fulfilled" && <>

                        <div className="cart-head">
                            <h1 className="cart-title">Корзина</h1>
                            <button className="cart-clear" onClick={clearAllCart}>Очистить корзину</button>
                        </div>

                        {cart.map(item => (
                            <CartItem
                                item={item}

                                handleCart={handleCart}

                                selectCounts={selectCounts}
                                selectPrices={selectPrices}

                                errorSelect={errorSelect}
                                setErrorSelect={setErrorSelect}
                                key={item.id} />
                        ))}

                        <div className="cart-statistika">
                            <p className="statistika-count">
                                Выбрано пицц: <span>{selectCounts}</span> шт.
                            </p>
                            <p className="statistika-price">
                                Сумма выбранного заказа: <span className='price'>{selectPrices}</span> сум
                            </p>
                        </div>

                        <div className="cart-submit">
                            <button className="cart-btn" onClick={visibleModalCart}>Заказать</button>
                        </div>

                    </>}

                    {cart.length === 0 && loading === "fulfilled" && <CartClean />}

                </div>
            </div>
        </section>
    );
}

export default React.memo(Cart);