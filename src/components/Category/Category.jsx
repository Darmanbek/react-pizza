import React, { useState } from "react";
import { data } from "./categories";
import Sort from "./Sort/Sort";
import { useDispatch } from "react-redux";
import { handleFilter } from "../../store/filterSlice/filterSlice";
import "./category.scss";

const Category = () => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(null);

    const handleCategory = (data) => {
        setActiveFilter(data.category);
        dispatch(handleFilter(data.category));
    }

    const handleAllCategory = () => {
        setActiveFilter(null);
        dispatch(handleFilter(null));
    }

    return (
        <section className="section-category">
            <div className="container">
                <div className="inner-category">

                    <div className="category-block">
                        <div className="category-btns">
                            <button className={activeFilter ? "category-btn" : "category-btn active"} onClick={handleAllCategory}>Все</button>
                            {data.map((btn) => (
                                <button key={btn.id} onClick={() => handleCategory(btn)} className={activeFilter === btn.category ? "category-btn active": "category-btn"}>{btn.categoryName}</button>
                            ))}
                        </div>
                        <Sort />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Category;