
import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import {
  Popper,
  Button,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  ClickAwayListener,
  Avatar
} from '@mui/material'
import { AuthContext } from '../lib/context/auth-context'
import TokenAPI from '../lib/api/token'
import UsersAPI from '../lib/api/users'

// eslint-disable-next-line import/no-unresolved
import endpoint from '../endpoints.config'
import Rotas from './rotas'

import '../assets/css/unimed.css'

const drawerWidth = 160

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#006600',
    backgroundImage: 'linear-gradient(45deg, #006600 30%, #048604  95%)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 10
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#006600'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#00995d'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(3.5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(5) + 1
    },
    backgroundColor: '#006600'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    color: 'secondary'
  },
  main: {
    paddingLeft: theme.spacing(1)
  },
  nested: {
    paddingLeft: theme.spacing(1),
    backgroundColor: '#fff'
  },
  nested2: {
    paddingLeft: theme.spacing(4),
    backgroundColor: '#fff'
  }
}))

export default function NavMenu(props) {
  const classes = useStyles()
  // const location = useLocation()
  // let { from } = location.state
  const [open, setOpen] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)
  const [openCad, setOpenCad] = React.useState(false)
  const [dados, setDados] = React.useState({})
  const { dadosUser } = useContext(AuthContext)
  const anchorRef = React.useRef(null)
  const storage = TokenAPI.getToken()
  const perfis = dadosUser?.groups || storage?.perfis;
  // const { dadosUpload } = useContext(UploadContext)

  let menu = false;

  perfis?.map((e) => {
    if (
      e.descricao === 'unimed'
    ) {
      menu = true;
    }
  });

  const Login = storage?.name ? 'Logout' : 'Login'
  const Account = storage?.name ? 'Minha conta' : 'Cadastra-se'

  const prevOpen = React.useRef(openUser)
  const handleToggle = () => {
    setOpenUser((prevOpen) => !prevOpen)
    prevOpen.current = !openUser
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpenUser(false)
  }

  const handleStorage = () => {
    TokenAPI.removeToken()
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleClick = () => {
    setOpenCad(!openCad)
  }

  // return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpen.current === true && openUser === true) {
      anchorRef.current.focus()
    }

    prevOpen.current = openUser
  }, [openUser])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  // const GetUserByID = async () => {

  //   const resp = await UsersAPI.getUserByID(storage?.id || dadosUser?.id);
  //   setDados(resp);

  // }

  // useEffect(() => {
  //   GetUserByID()
  //   // setOpenCad(openCad)

  // }, [])

  return (
    <div className={`${classes.root}`}>
      <CssBaseline />
      <AppBar

        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: open
          },
          'bg-verde-unimed'
        )}>
        <div className="row">
          <Toolbar>
            <div className="col-md-6" style={{ marginLeft: '10px' }}>
              {/* {(dadosUser || storage?.name) && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open
                  })}>
                  <MenuIcon />
                </IconButton> */}
              {/* )} */}
              <img
                alt="Unimed Chapecó"
                src="https://unimedchapeco.coop.br/assets/img/logo_110_51.png"
              />
            </div>
            {/* <Typography variant="h6" noWrap>
            Eventos
          </Typography> */}
            <div className="col-md-6 text-end">

              <><Button
                ref={anchorRef}
                id="composition-button"
                // aria-controls={openUser ? 'composition-menu' : undefined}
                aria-expanded={openUser ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <Avatar
                  // alt="Remy Sharp"
                  src={`${endpoint.UserBaseUrl}/wwwroot/Docs/${storage?.image}`}
                  sx={{ width: 38, height: 38 }}
                />
              </Button>
                <Popper
                  open={openUser}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start'
                            ? 'left top'
                            : 'left bottom'
                      }}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={true}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            // eslint-disable-next-line react/jsx-no-bind
                            onKeyDown={handleListKeyDown}>
                            <MenuItem
                              component={Link}
                              to="/login"
                              onClick={() => handleStorage()}>
                              {Login}
                            </MenuItem>
                            {(dadosUser || storage?.name) &&
                              <>
                                <MenuItem
                                  component={Link}
                                  to="/"
                                >Home
                                </MenuItem>
                                <MenuItem
                                  component={Link}

                                  to={{
                                    pathname: "/user-list",
                                    state: dados
                                  }}
                                >{Account}
                                </MenuItem>
                              </>
                            }
                            {menu && <MenuItem
                              component={Link}

                              to={{
                                pathname: "/request-list",
                                state: { type: 'list', status: 'new' }
                              }}
                            >Solicitações
                            </MenuItem>}
                            {/* <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                          <MenuItem onClick={handleClose}>Sair</MenuItem> */}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper></>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  )
}
