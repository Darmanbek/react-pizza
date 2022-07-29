import React from "react";
import { Category, Products, Modal } from "../../components";
import "./homePage.scss";

const Home = () => {
    return (
        <div className="home">
            <Category />
            <Products />
            <Modal />
        </div>
    );
}

export default Home;