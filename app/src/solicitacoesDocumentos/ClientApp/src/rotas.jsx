/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-use-before-define
import { Suspense, useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@material-ui/core';

import mediaQuery from 'css-mediaquery';
import PrivateRoute from './components/routes/private-route';
import DefaultRoute from './components/routes/public-route';
import FreeRoute from './components/routes/free-route';
import Loader from './components/loader';
import Home from './components/home';
import NewPassword from './components/NewPassword';
// eslint-disable-next-line import/no-cycle
import Layout from './components/Layout';
import RequestList from './components/request-list';
import UserList from './components/form-user';
import FileAvailables from './components/files-availables';
// import ConsumosAceitos from './pages/reports/consumos-aceitos'
import NavMenu from './components/NavMenu';
import Login from './components/layout/login';
import AuthAPI from './lib/api/auth';
import { LoaderContext } from './lib/context/loader-context';

// const TermosAceitos = lazy(() => import('./pages/reports/termos-aceitos'));

const Rotas = (props) => {
  const darkMode = false;
  const { setIsLoading, estaAutenticado, setEstaAutenticado } =
    useContext(LoaderContext);
  // const history = useHistory();
  // const location = useLocation();
  // const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    const result = await AuthAPI.isAuth(setEstaAutenticado);
    setEstaAutenticado(result);
    setIsLoading(false);
  };

  const ssrMatchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: 800,
    }),
  });
  const theme = createTheme({
    spacing: 8,

    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f44336',
      },
      secondary: {
        main: '#3EA6FF',
      },
      background2: {
        default: darkMode ? '#232323' : '#FFF',
        dark: '#006600',
        paper: darkMode ? '#232323' : '#FFF',
      },
      backgroundImage: 'linear-gradient(45deg, #006600 30%, #006600 96%)',
      MuiUseMediaQuery: {
        // Change the default options of useMediaQuery
        defaultProps: { ssrMatchMedia },
      },
    },
  });

  return (
    <Suspense
      fallback={
        <div>
          <Loader loading />
        </div>
      }>
      {/* <Switch> */}
      <Switch>
        {/* <Route
          // basename={process.env.PUBLIC_URL}
          history={history.createHref(location)}
          render={({ location, history }) => (
            <> */}
        <ThemeProvider theme={theme}>
          <NavMenu />
          <DefaultRoute exact path="/login" component={() => <Login />} />
          <Layout>
            <FreeRoute exact path="/" component={() => <Home />} />
            <FreeRoute
              exact
              path="/new-password"
              component={() => <NewPassword />}
            />
            <PrivateRoute
              exact
              path="/request-list"
              component={() => <RequestList />}
            />
            <PrivateRoute
              path="/files-requested/:id"
              component={() => <FileAvailables />}
            />
            <FreeRoute exact path="/user-list" component={() => <UserList />} />
          </Layout>
        </ThemeProvider>
        {/* <Route path="*" component={() => <h1>Page not found</h1>} /> */}
        {/* </>
          )}
        /> */}
      </Switch>
      {/* <PrivateRoute path="/restrito" component={PaginaRestrita} /> */}

      {/* <PrivateRoute path="/" component={() => <Home />} /> */}
      {/* </Switch> */}
    </Suspense>
  );
};
export default Rotas;
