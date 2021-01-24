import React, { useEffect } from 'react';
import LoginPage from './components/AuthReg/Login'
import MainPage from './components/Main/Main'
import RegPage from './components/AuthReg/Reg'
import EditProfilePage from './components/EditProfilePage/EditProfile'
import ChartsPage from './components/ChartsPage/Charts'
import ProfilesPage from './components/ProilesPage/Profiles'
import LcPage from './components/LikesCommentsPage/Lpage'
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
          <ProtectedRoute
            exact
            path="/editprofile"
            Component={EditProfilePage}
            isAuthenticated={authState}
            isVerifying={verifyState}
          />
          <ProtectedRoute
            exact
            path="/profile/:id"
            Component={ProfilesPage}
            isAuthenticated={authState}
            isVerifying={verifyState}
          />
          <ProtectedRoute 
            exact 
            path="/comment/:id"
            Component={LcPage}
            isAuthenticated={authState}
            isVerifying={verifyState}
          />
      </Switch>
  )
};

export default App;
