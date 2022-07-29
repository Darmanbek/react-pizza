import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { alertVisible } from '../../store/alertSlice/alertSlice';
import "./alertProduct.scss";

const AlertProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product, visible, duration, method } = useSelector(state => state.alert);

    const handleNavigate = () => {
        if(method === "add"){
            navigate("/cart");
        }
        dispatch(alertVisible(false));
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                dispatch(alertVisible(false));
            }, duration);
        }
    }, [visible]);
    return (
        <div className={visible ? "alert-add-product" : "alert-add-product hide"} onClick={handleNavigate}>
            {product &&
                <div className={`alert-block ${method}`}>
                    <div className="alert-img">
                        {method === "cart" 
                        ? 
                        <FaCheckCircle className='alert-img_icon' /> 
                        :
                        <img src={product.imageUrl} alt="pizza" />}
                    </div>
                    <div className="alert-body">
                        <div className={`alert-title ${method}`}>   
                            <h1>{method === "cart" 
                            ? 
                            "Благодарим вас за заказ!" 
                            :
                            product.name}</h1>
                            <div className={`alert-desc ${method}`}>
                                <p>Размер: <span>{product.size}</span> см</p>
                                <p><span>{product.productType}</span> тесто</p>
                            </div>
                        </div>
                        <div className={`alert-count flex-center ${method}`}>
                            <p>x<span className={method}>{product.count}</span></p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default React.memo(AlertProduct);