import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { sortItems } from "./sortItems";
import { handleSort } from "../../../store/filterSlice/filterSlice";
import { useDispatch } from "react-redux";
import "./sort.scss";

const Sort = () => {
    const dispatch = useDispatch();
    const [sortShow, setSortShow] = useState(false);
    const [sortName, setSortName] = useState({
        name: "популярности",
        type: "rating",
        order: "desc",
    });
    const sortRef = useRef();

    const clickItem = (item) => {
        setSortName(item);
        setSortShow(false);
        dispatch(handleSort(item))
    };

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!e.path.includes(sortRef.current)) {
                setSortShow(false);
            }
        });
    }, []);

    return (
        <div className="category-sort" ref={sortRef}>
            <h3 className="sort-title" onClick={() => setSortShow((prev) => !prev)}>
                <span className={sortShow ? "rotate" : ""}>
                    <FaCaretDown className="down-icon" />
                </span>
                <span className="sort-down-title">Сортировка по:</span>
            </h3>
            <p className="desc-sort">{sortName.name}</p>
            <ul className={sortShow ? "sort-items active" : "sort-items"}>
                {sortItems.map((item) => (
                    <li key={item.id} onClick={() => clickItem(item)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default React.memo(Sort);