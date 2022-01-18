import { Formik, Field, Form } from 'formik'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import * as Yup from 'yup'

import { TextField } from '@mui/material'
import { Input } from '../../form2'
import './form-login.css'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Favor informar seu login da rede'),
  password: Yup.string().required('Favor informar sua senha')
})

const LoginForm = ({ loginData, submitForm }) => {
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
  )
}

export default LoginForm
