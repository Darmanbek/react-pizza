import React from "react";
import { Logo } from "../../assets";
import HeaderCard from "./HeaderCart/HeaderCart";
import "./header.scss";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">

                    <div className="header-logo">
                        <a href="/" className="logo-link">
                            <span className="logo-img">
                                <img src={Logo} alt="logo" />
                            </span>
                            <div className="logo-desc">
                                <h3>REACT PIZZA</h3>
                                <p>самая вкусная пицца во вселенной</p>
                            </div>
                        </a>
                    </div>

                    <HeaderCard />

                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);