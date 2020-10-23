import React, { useEffect } from 'react';
import LoginPage from './components/Login'
import MainPage from './components/Main'
import RegPage from './components/Reg'
import ChartsPage from './components/Charts'
import Preloader from './components/Preloader'
import ProtectedRoute from './containers/ProtectedRoute'
import { verifyRequest } from './actions/auth'
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'


interface AuthTypes {
  auth: {
    isAuthenticated: boolean,
    isVerifying: boolean
  }
}


const App: React.FC = () => {

  const authState = useSelector(( state: AuthTypes ) => state.auth.isAuthenticated)
  const verifyState = useSelector(( state: AuthTypes ) => state.auth.isVerifying)
  const dispatch = useDispatch();

  useEffect(() => {
   //dispatch(verifyRequest())
  }, [])


  if (verifyState) {
    return (
      <div>
      <Preloader />
      {console.log(verifyState)}
      </div>
    )
  }

  return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/reg" component={RegPage} />
        <ProtectedRoute
            exact
            path="/"
            Component={MainPage}
            isAuthenticated={authState}
            isVerifying={verifyState}
          />
          <ProtectedRoute
            exact
            path="/charts"
            Component={ChartsPage}
            isAuthenticated={authState}
            isVerifying={verifyState}
          />
      </Switch>
  )
};

export default App;
