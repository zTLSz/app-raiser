import React from "react";
import { Route, Redirect } from "react-router-dom";
import Icon from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 64 }} spin />;


interface ProtectedRouteTypes {
  Component: any,
  isAuthenticated: boolean,
  isVerifying: boolean,
  exact: boolean,
  path: string,
}

const ProtectedRoute: React.FC<ProtectedRouteTypes> = ({
    Component,
    isAuthenticated,
    isVerifying,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        isVerifying ? (
          <div style={{ 
            position: 'fixed', 
            top: '0', 
            bottom: '0',
            left: 0, 
            right: 0, 
            paddingTop:'40vh', 
            textAlign: 'center'
          }}> <Spin indicator={antIcon} /></div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );




  export default ProtectedRoute;