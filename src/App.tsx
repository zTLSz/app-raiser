import React from 'react';
import LoginPage from './components/Login'
import MainPage from './components/Main'
import RegPage from './components/Reg'
import ProtectedRoute from './containers/ProtectedRoute'
import { Route, Switch } from "react-router-dom";





const App: React.FC = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/reg" component={RegPage} />
     <ProtectedRoute
        exact={true}
        path="/"
        Component={MainPage}
        isAuthenticated={false}
        isVerifying={false}
      />
  </Switch>
);

export default App;
