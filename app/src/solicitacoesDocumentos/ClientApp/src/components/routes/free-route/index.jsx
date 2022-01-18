// eslint-disable-next-line no-use-before-define
import React from 'react'

import { Route } from 'react-router-dom'
// import AuthAPI from '../../../lib/api/auth'
// eslint-disable-next-line import/no-cycle
// import Layout from '../../Layout'

const FreeRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(innerProps) => (
        <div>
          <Component {...innerProps} />
        </div>
      )}
    />
  )
}

export default FreeRoute
