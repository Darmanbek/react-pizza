import React from "react"
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem/ProductItem";
import SkeletonItem from "./SkeletonItem/SkeletonItem";
import "./products.scss";

const Products = () => {
    const { products, loading } = useSelector((state) => state.products);
    const array = [1, 2, 3, 4, 5, 6];

    return (
        <section className="section-products">
            <div className="container">
                <div className="inner-products">

                    <div className="products-block">
                        <h1 className="products-title">Все пиццы</h1>
                        <div className="products">
                            {loading === "pending" && array.map((_, i) => (
                                <SkeletonItem key={i} />
                            ))}
                            {loading === "fulfilled" && products.length > 0 && products.map((product) => (
                                <ProductItem data={product} key={product.id} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Products;