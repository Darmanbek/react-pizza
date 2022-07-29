import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/index.scss";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);  