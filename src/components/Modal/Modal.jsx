import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsXCircle } from "react-icons/bs";
import { handleVisible } from '../../store/modalSlice/modalSlice';
import { getCart, postCart, putCart } from '../../store/cartSlice/cartSlice';
import { addNewProduct, alertVisible } from '../../store/alertSlice/alertSlice';
import API from "../../api";
import "./modal.scss";

const Modal = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { visible, id } = useSelector(state => state.modal);

    const [index, setIndex] = useState(1);
    const [indexType, setIndexType] = useState(0);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleIndex = (i) => {
        if (i === 0) {
            setIndexType(0);
        }
        setIndex(i);
    }

    const handleIndexType = (i, isShow) => {
        if (isShow) {
            setIndexType(i);
        } else {
            setIndexType(0);
        }

    }

    const getProduct = async () => {
        try {
            setLoading(true);
            const responce = await API.get(`products/${id}`);
            if (responce.status === 200) {
                setProduct(responce.data);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const addProduct = () => {
        let newCartProduct = {
            name: product.name,
            imageUrl: product.imageUrl,
            size: product.sizes[index].size,
            price: product.sizes[index].price,
            productType: product.sizes[index].type[indexType].typeName,
            count: 1
        }

        cart.map(item => {
            if(item.name === newCartProduct.name &&
                item.size === newCartProduct.size &&
                item.productType === newCartProduct.productType){
                newCartProduct = {...newCartProduct, count: item.count + 1, id: item.id}
            }
        });

        if(newCartProduct.id){
            dispatch(putCart(newCartProduct))
        }else{
            dispatch(postCart(newCartProduct));
        }
        dispatch(addNewProduct({product: newCartProduct, method: "add"}));
        hideModal();
        dispatch(alertVisible(true));
    }

    const hideModal = () => {
        dispatch(handleVisible(null));
    }

    useEffect(() => {
        if (id) {
            getProduct();
            dispatch(getCart());
        }

        return () => {
            setProduct(null);
            setIndex(1);
            setIndexType(0);
        }
    }, [id])

    return (
        <div className={visible ? "modal-block show" : "modal-block"} onClick={hideModal}>
            <div className={visible ? "modal-inner show" : "modal-inner"} onClick={e => e.stopPropagation()}>

                {loading && <h1 style={{ textAlign: "center" }}>{loading}</h1>}
                {error && <h1>{error}</h1>}

                {product && <div className="modal-product">

                    <div className="modal-image-block">
                        <img 
                        className={index === 0 ? "small": index === 1 ? "medium": "big"} 
                        src={product.imageUrl} alt={product.name} />
                    </div>

                    <div className="modal-body-block">
                        <div className='modal-title'>
                            <h2>{product.name}</h2>
                            <span onClick={hideModal}><BsXCircle /></span>
                        </div>

                        <div className="modal-type">
                            <span>{product.sizes[index].size} см, {product.sizes[index].type[indexType].typeName} тесто</span>
                        </div>

                        <div className="modal-desc">
                            <span>{product.desc}</span>
                        </div>

                        <div className="modal-select-size">
                            <span className={index === 0 ? "size left" : index === 2 ? "size right" : "size top"}></span>
                            {product.sizes.map((item, i) => (
                                <p key={i} onClick={() => handleIndex(i)}>{item.size} см</p>
                            ))}
                        </div>

                        <div className='flex'>

                            <div className="modal-select-type">
                                <span className={indexType === 0 ? "type left" : "type right"}></span>
                                {product.sizes[index].type.map((item, i) => (
                                    <p key={i}
                                        className={!item.isShow ? "not-active" : ""}
                                        onClick={() => handleIndexType(i, item.isShow)}>
                                        {item.typeName}
                                    </p>
                                ))}
                            </div>

                        </div>

                        <div className="add-to-cart-btn">
                            <button onClick={addProduct}>Добавить в корзину за <span>
                                {product.sizes[index].price}</span> сум
                            </button>
                        </div>
                    </div>


                </div>}

            </div>
        </div>
    );
}

export default React.memo(Modal);