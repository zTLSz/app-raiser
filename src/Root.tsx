import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import { GlobalStyle } from './containers/GlobalStyle'
import 'antd/dist/antd.css';



const Root: React.FC = () => {


    return (
        <Provider store={store}>
            <GlobalStyle />
            <Router>
                <App />
            </Router>
        </Provider>
    )
};

export default Root;
