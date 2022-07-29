import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleVisible } from "../../../store/modalSlice/modalSlice";
import "./productItem.scss";

const ProductItem = ({ data }) => {
    const dispatch = useDispatch();
    const { visible } = useSelector(state => state.modal);

    const selectProduct = (id) => {
        dispatch(handleVisible(id));
    }

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    return (
        <div className="product" onClick={() => selectProduct(data.id)}>
            <div className="product-img">
                <img src={data.imageUrl} alt={data.name} />
            </div>
            <div className="product-body">
                <h3 className="product-title">{data.name}</h3>
                <p className="product-desc">{data.desc}</p>
                <div className="product-footer">
                    <div className="product-price">
                        <p>
                            от <span>{data.price}</span> сум
                        </p>
                    </div>
                    <button className="product-select-btn">Выбрать</button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;