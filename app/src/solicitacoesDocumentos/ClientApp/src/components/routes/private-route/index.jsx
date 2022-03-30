// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useState, useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import AuthAPI from '../../../lib/api/auth';
// eslint-disable-next-line import/no-cycle
import Layout from '../../Layout';
import { LoaderContext } from '../../../lib/context/loader-context';
import TokenAPI from '../../../lib/api/token';

const PrivateRoute = ({ component: Component, ...props }) => {
  const location = useLocation();
  const { estaAutenticado } = useContext(LoaderContext);
  const storage = TokenAPI.getToken();

  return (
    <Route
      {...props}
      render={(innerProps) =>
        estaAutenticado || storage?.token ? (
          <div>
            <Component {...innerProps} />
          </div>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
