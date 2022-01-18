// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  Inbox,
  LibraryBooks,
  Home,
  PersonAdd,
  Event
} from '@material-ui/icons'

const rotas = [
  {
    title: 'Home',
    path: '/',
    icon: <Home />
  },
  {
    title: 'Cadastros',
    icon: <LibraryBooks />,
    children: [{
      label: 'Usuários',
      path: '/user-list',
      icon: <PersonAdd />
    },
    {
      label: 'Eventos',
      path: '/request-list',
      icon: <Event />
    }]
  }
]

export default rotas
