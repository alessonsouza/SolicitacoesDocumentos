
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
import { Link } from 'react-router-dom'
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
// import Ale from '../../assets/uploads/'
// eslint-disable-next-line import/no-unresolved
import endpoint from '../endpoints.config'
import Rotas from './rotas'

import '../assets/css/colors.css'

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

export default function MiniDrawer(props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)
  const [openCad, setOpenCad] = React.useState(false)
  const [dados, setDados] = React.useState({})
  const { dadosUser } = useContext(AuthContext)
  const anchorRef = React.useRef(null)
  const storage = TokenAPI.getToken()
  // const { dadosUpload } = useContext(UploadContext)

  const Login = storage?.name ? 'Logout' : 'Login'
  const Account = storage?.name ? 'Minha conta' : 'Cadastra-se'

  const handleToggle = () => {
    setOpenUser((prevOpen) => !prevOpen)
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
  const prevOpen = React.useRef(openUser)
  React.useEffect(() => {
    if (prevOpen.current === true && openUser === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = openUser
  }, [openUser])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const HandleRoutes = () => {
    const rotas = Rotas.map((text, index) => {
      // eslint-disable-next-line multiline-ternary
      return text.children ? (
        <>
          <ListItem key={text.title} className={classes.main} button onClick={handleClick}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
          {/* <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem> */}
          <Collapse in={openCad} key={text.path} timeout="auto" unmountOnExit>
            {text.children.map((child) => (
              <>
                {/* <List component="div" disablePadding key={child.label}> */}
                <ListItem
                  key={child.path}
                  button
                  component={Link}
                  to={child.path}
                  className={open ? classes.nested2 : classes.nested}>
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItem>
              </>
              // </List>
            ))}
          </Collapse>
        </>
      ) : (
        <ListItem component={Link} className={classes.main} to={text.path} button key={text.title}>
          <ListItemIcon>{text.icon}</ListItemIcon>
          <ListItemText primary={text.title} />
        </ListItem>
      )
    })
    return rotas
  }
  const GetUserByID = async () => {

    const resp = await UsersAPI.getUserByID(storage?.id);
    setDados(resp);

  }

  useEffect(() => {
    GetUserByID()
  }, [])

  return (
    <div className={`${classes.root}`}>
      <CssBaseline />
      <AppBar

        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: open
          },
          'bg-verde-docs'
        )}>
        <div className="row">
          <Toolbar>
            <div className="col-md-6" style={{ marginLeft: '10px' }}>
              {(dadosUser || storage?.name) && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open
                  })}>
                  <MenuIcon />
                </IconButton>
              )}
            </div>
            {/* <img
          alt="docs Chapecó"
          src="https://docschapeco.coop.br/assets/img/logo_110_51.png"
        /> */}
            {/* <Typography variant="h6" noWrap>
            Eventos
          </Typography> */}
            <div className="col-md-6 text-end">
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={openUser ? 'composition-menu' : undefined}
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
                          autoFocusItem={openUser}
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
                          <MenuItem
                            component={Link}

                            to={{
                              pathname: "/request-list",
                              state: { type: 'list', status: 'new' }
                            }}
                          >Solicitações
                          </MenuItem>
                          {/* <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                          <MenuItem onClick={handleClose}>Sair</MenuItem> */}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
