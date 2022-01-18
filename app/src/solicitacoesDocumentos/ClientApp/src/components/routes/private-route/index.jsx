// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

import { Route, Redirect } from 'react-router-dom'
import AuthAPI from '../../../lib/api/auth'
// eslint-disable-next-line import/no-cycle
import Layout from '../../Layout'

const PrivateRoute = ({ component: Component, ...props }) => {
  const [estaAutenticado, setEstaAutenticado] = useState(async () => {
    await AuthAPI.isAuth().then((res) => {
      setEstaAutenticado(res.data)
      return res.data || false
    })
  })

  return (
    <Route
      {...props}
      render={(innerProps) =>
        estaAutenticado
          ? (
          <div>
            <Component {...innerProps} />
          </div>
            )
          : (
          <Redirect to="/login" />
            )
      }
    />
  )
}

export default PrivateRoute
