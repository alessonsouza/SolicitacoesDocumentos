import { Formik, Field, Form } from 'formik';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { LoaderContext } from '../../../lib/context/loader-context';
import { AuthContext } from '../../../lib/context/auth-context';
import { TextField } from '@mui/material';
import CryptoJS from 'crypto-js';
import { Input } from '../../form2';
import AuthAPI from '../../../lib/api/auth';
import './form-login.css';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Favor informar seu login da rede'),
  password: Yup.string().required('Favor informar sua senha'),
});
const initialState = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  // history.replace(from);
  const [loginData, setLoginData] = useState(initialState);
  const [successLogin, setSuccessLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState({});

  const { setIsLoading, setEstaAutenticado } = useContext(LoaderContext);
  const { dadosUser, setDadosUser } = useContext(AuthContext);
  const submitForm = async (values) => {
    setIsLoading(true);
    const sizeString = values.password.length;
    const lastDigit = values.password.slice(0, 1);
    let senhaMd5 = values.password;
    if (lastDigit !== '/') {
      senhaMd5 = CryptoJS.MD5(`{uni${values.password}med}`).toString();
    }

    const obj = { ...values };
    obj.usuario = values.username;
    obj.senha = senhaMd5;
    const result = await AuthAPI.autenticate(obj);
    setLoginData(values);
    setSuccessLogin(result?.success);
    setDadosUser(result?.user);
    if (result.success === false) {
      setErrorLogin(result);
    }
    setEstaAutenticado(result?.success);
    history.push(from?.pathname);
    setIsLoading(false);
  };
  return (
    <>
      <Formik
        initialValues={loginData}
        onSubmit={submitForm}
        validationSchema={validationSchema}>
        {(formProps) => (
          <div>
            <Form>
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <Field
                    id="usuario"
                    name="username"
                    placeholder="Usuário"
                    value={formProps.values.username}
                    component={Input}
                  />
                </div>

                <div className="col-md-12 ">
                  <Field
                    placeholder="Senha"
                    id="senha"
                    name="password"
                    type="password"
                    value={formProps.values.password}
                    component={Input}
                  />
                </div>
              </div>
              <div class="form__input--floating mt-3">
                <a
                  href="/new-password"
                  class="btn__tertiary--medium forgot-password"
                  data-cie-control-urn="forgot-password-btn">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="row mt-3 text-center">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn bg-verde-primario cor-branco btn-block">
                    Conectar
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
