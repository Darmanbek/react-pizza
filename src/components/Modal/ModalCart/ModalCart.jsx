import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsXCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct } from '../../../store/cartSlice/cartSlice';
import { handleID, handleVisibleCart } from '../../../store/modalSlice/modalSlice';
import { addNewProduct, alertVisible } from '../../../store/alertSlice/alertSlice';
import api from '../../../api';
import "./modalCart.scss";

const ModalCart = () => {
    const dispatch = useDispatch();
    const { visibleCart, selectID } = useSelector(state => state.modal);
    const [number, setNumber] = useState("+998 ");
    const [error, setError] = useState(false);
    const array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const hideModalCart = () => {
        dispatch(handleVisibleCart());
        setNumber("+998 ");
    }

    const handleNumber = (e) => {
        setError(false);
        if(array.includes(e.nativeEvent.data) && number.length <= 16){
            if(number.length === 7 ||
                number.length === 11 ||
                number.length === 14){
                setNumber(prev => prev + "-");
            }
            setNumber(prev => prev + e.nativeEvent.data);
        }
        if(e.nativeEvent.inputType === "deleteContentBackward" && number.length >= 6){
            setNumber(prev => prev.substring(0, prev.length-1));
        }
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const getNumber = async () => {
        if(number.length === 17){
            const getNum = number.replace(" ", "").replaceAll("-", "");
            for (let i = 0; i < selectID.length; i++) {
                const item = selectID[i];
                dispatch(deleteCartProduct(item));
                await api.delete(`/cartProducts/${item}`);
                delay(1000);
            }
            dispatch(handleID([]));
            dispatch(addNewProduct({product: null, method: "cart" }));
            dispatch(alertVisible(true));
            hideModalCart();
        }else{
            setError(true);
        }
    }
    
    useEffect(() => {
        if(error){
            setTimeout(() => {
                setError(false)
            }, 1100);
        }
    }, [error])

    return (
        <div className={visibleCart ? "modal-cart-block show" : "modal-cart-block"} onClick={hideModalCart}>
            <div className={visibleCart ? "modal-cart show flex-center": "modal-cart flex-center"} onClick={e => e.stopPropagation()}>
                <div className="cart-inner">
                    <label htmlFor="number">Введите номер телефона</label>
                    <input type="text" id='number' className={error ? "error" : "success"} value={number} onChange={handleNumber}/>
                    <button className='send-btn' onClick={getNumber}>Отправить</button>
                </div>
                <button className='exit-cart-btn' onClick={hideModalCart}><BsXCircle /></button>
            </div>
        </div>
    )
}

export default React.memo(ModalCart);