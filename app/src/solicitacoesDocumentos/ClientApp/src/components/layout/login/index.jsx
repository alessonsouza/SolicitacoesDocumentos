// import React, { useState, useContext } from 'react'
// import { Redirect } from 'react-router-dom'

// import { Alert, AlertTitle } from '@material-ui/lab'
// import { CardContent, Card } from '@material-ui/core'
// import CryptoJS from 'crypto-js'
// import Header from './header'
// import LoginForm from './login-form'
// import { Box, BoxTitle } from '../../box-card'
// import { LoaderContext } from '../../../lib/context/loader-context'
// import { AuthContext } from '../../../lib/context/auth-context'
// import AuthAPI from '../../../lib/api/auth'

// import './form-login.css'

// eslint-disable-next-line no-use-before-define
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Alert, AlertTitle } from '@material-ui/lab';
import CryptoJS from 'crypto-js';
import Header from './header';
import LoginForm from './login-form';
import { Box, BoxTitle } from '../../box-card';
import { LoaderContext } from '../../../lib/context/loader-context';
import { AuthContext } from '../../../lib/context/auth-context';
import AuthAPI from '../../../lib/api/auth';

import './form-login.css';

const initialState = {
  username: '',
  password: '',
};

const Layout = () => {
  const [loginData, setLoginData] = useState(initialState);
  const [successLogin, setSuccessLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState({});

  const { setIsLoading } = useContext(LoaderContext);
  const { setDadosUser } = useContext(AuthContext);

  const submitForm = async (values) => {
    setIsLoading(true);

    const senhaMd5 = CryptoJS.MD5(`{uni${values.password}med}`).toString();

    const obj = { ...values };
    obj.usuario = values.username;
    obj.senha = senhaMd5;
    const result = await AuthAPI.autenticate(obj);
    setLoginData(values);
    setSuccessLogin(result.success);
    setDadosUser(result?.user);
    if (result.success === false) {
      setErrorLogin(result);
    }
    setIsLoading(false);
  };

  return (
    <>
      {successLogin ? (
        <Redirect to="/" />
      ) : (
        <>
          <Header />
          <div className="container">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Box className="form-login">
                <BoxTitle className="text-center text-uppercase">
                  Acesso Restrito
                </BoxTitle>
                <LoginForm submitForm={submitForm} loginData={loginData} />
              </Box>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {errorLogin.success === false && (
                <Box className="form-login mt-0">
                  <Alert severity="error">
                    <AlertTitle>{errorLogin.error}</AlertTitle>
                  </Alert>
                </Box>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
