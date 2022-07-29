import React, { useState, useEffect } from 'react';
import { deleteCartProduct, editCartProduct } from "../../../store/cartSlice/cartSlice";
import { FaCheck } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addNewProduct, alertVisible } from '../../../store/alertSlice/alertSlice';
import api from '../../../api';
import "./cartItem.scss";

const CartItem = (
    { item,
        selectCounts, selectPrices,
        handleCart,
        errorSelect, setErrorSelect
    }) => {
    const dispatch = useDispatch();
    const { id, name, price, imageUrl, productType, size } = item;

    const [btnActive, setBtnActive] = useState(false);

    const [innerLoading, setInnerLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [count, setCount] = useState(item.count);

    const handleBtnActive = () => {
        setBtnActive(prev => !prev);
    }

    const handleCount = (number) => {
        if (!btnActive) {
            if (number < 0 && count <= 1) {
                setCount(1);
            } else {
                setCount(prev => prev + number);
            }
        }
    }

    const deleteCartItem = async (item) => {
        const { id } = item;
        if(btnActive){
            setBtnActive(false);
        }
        try {
            setDeleteLoading(true);
            const responce = await api.delete(`cartProducts/${id}`);
            if (responce.status === 200) {
                dispatch(deleteCartProduct(item.id));
                dispatch(alertVisible(true));
                dispatch(addNewProduct({ product: item, method: "remove" }))
                setDeleteLoading(false)
            }
        } catch (error) {
            setErrorSelect(true);
            setDeleteLoading(false);
        }

    }

    const putCartItem = async (newItem) => {
        setInnerLoading(true);
        const { id } = newItem;
        try {
            const responce = await api.put(`cartProducts/${id}`, newItem);
            if (responce.status === 200) {
                dispatch(editCartProduct(responce.data));
                setInnerLoading(false);
            }
        } catch (error) {
            setErrorSelect(true);
            setInnerLoading(false);
        }
    }

    useEffect(() => {
        if (btnActive) {
            const newItem = { ...item, count: count };
            handleCart(1, count * price, id, "add");
            if (count !== item.count) {
                putCartItem(newItem);
            }
        }
        if (!btnActive) {
            if (selectCounts > 0) {
                handleCart(-1, 0, id, "remove")
            }
            if (selectPrices > 0) {
                handleCart(0, -(count * price), id, "remove")
            }
        }
    }, [btnActive]);

    useEffect(() => {
        if (errorSelect) {
            setTimeout(() => {
                setErrorSelect(false);
            }, 1000)
        }
    }, [errorSelect])

    return (
        <div className={errorSelect ? "cart-item-block error" : "cart-item-block"}>
            <div className="cart-image">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="cart-body">
                <div className="cart-type">
                    <h1>{name}</h1>
                    <div className="cart-type_desc">

                        <p>Размер: <span>{size}</span> см</p>
                        <p>{productType} тесто</p>
                    </div>
                </div>

                <div className={btnActive ? "cart-count not-active" : "cart-count"}>
                    <div className="cart-count-block">
                        <button className={btnActive ? 'minus' : 'minus active'} onClick={() => handleCount(-1)}>-</button>
                        <span className='flex-center'>{count}</span>
                        <button className={btnActive ? 'plus' : 'plus active'} onClick={() => handleCount(1)}>+</button>
                    </div>
                </div>

                <div className="cart-price">
                    <p><span>{price * count}</span> сум</p>
                    <button onClick={handleBtnActive} className={
                        btnActive ?
                            innerLoading ? "check-price active flex-center loading" : "check-price active flex-center"
                            : "check-price flex-center"}>
                        {innerLoading && btnActive ? <AiOutlineLoading /> : <FaCheck />}
                    </button>
                    <button onClick={() => deleteCartItem(item)}
                        className={deleteLoading ? "delete-price flex-center loading" : "delete-price flex-center"}>
                        {deleteLoading ? <AiOutlineLoading /> : <BsX />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;