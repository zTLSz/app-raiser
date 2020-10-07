import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import 'antd/dist/antd.css';



const Root: React.FC = () => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

export default Root;
