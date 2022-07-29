import React, { useEffect } from 'react';
import { getProducts } from './store/productsSlice/productsSlice';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AlertProduct, Header } from "./components";
import { HomePage, CartPage, NotFoundPage } from './pages';
import { getCart } from './store/cartSlice/cartSlice';

const App = () => {
    const dispatch = useDispatch();
    const { filter, sort } = useSelector(state => state.filter);

    const getNull = () => {
        return null;
    }

    useEffect(() => {
        dispatch(getProducts({ filter, sort }));
    }, [dispatch, filter, sort]);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    return (
        <div className="app">
            <Header />
            <AlertProduct />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;