/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
import React, { useRef, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  makeStyles,
  Typography,
  Box,
  Fab,
  Card,
  Divider,
  Paper,
  TextField,
  CardContent,
} from '@material-ui/core';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import MailIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import APIUsers from '../../lib/api/users';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/unimed.css';
import './index.css';
// eslint-disable-next-line import/no-unresolved
import endpoint from '../../endpoints.config';
import * as Yup from 'yup';
import { SecurityUpdateGoodSharp } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Favor informar seu login da rede'),
  password: Yup.string().required('Favor informar sua senha'),
});
const initialState = {
  name: '',
  email: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    backgroundColor: theme.palette.background.dark,
    backgroundImage: theme.palette.backgroundImage,
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
  listItemText: {
    marginLeft: theme.spacing(-2),
  },
  listItem: {
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(-1),
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const NewPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [dados, setDados] = useState(initialState);
  const [mail, setMail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const sendNewPassword = async () => {
    const resp = await APIUsers.NewPassword(dados.name, dados.email);
    // if (resp.success = true){
    await setSuccess(resp.success);
    // }
    console.log(resp);
  };

  const onChange = (name, value) => {
    const campos = { ...dados };
    campos[name] = value;
    setDados(campos);
  };

  const email = {
    name: 'E-mail',
    value: mail || '',
  };

  const nome = {
    name: 'Nome completo',
    value: name || '',
  };

  const HandleLogin = () => {
    history.push('/login');
  };

  return (
    <>
      {!success ? (
        <Formik
          initialValues={dados}
          onSubmit={sendNewPassword}
          validationSchema={validationSchema}>
          {(formProps) => (
            <div>
              <Form>
                <div className={classes.root}>
                  <Box>
                    {/* <div className="col-md-12">
          <Divider style={{ backgroundColor: 'black', marginBottom: '5px' }} />
        </div> */}
                    <div className="row">
                      {/* <div className="col-md-12"> */}
                      <Box
                        p={5}
                        style={{
                          // backgroundColor: '#7fffd43b',
                          width: '100%',
                        }}>
                        <Paper elevation={5} style={{ height: '100%' }}>
                          <Card
                            key={0}
                            style={{
                              width: '100%',
                              // backgroundColor: 'rgb(13, 74, 40)',
                              padding: '4%',
                            }}>
                            <div className="row">
                              <div className="col-md-12 text-center">
                                <Typography variant="h4">
                                  Redefinição de senha
                                </Typography>
                              </div>
                              <div className="col-md-12 text-center mt-5">
                                <TextField
                                  required
                                  fullWidth
                                  label={'Nome completo'}
                                  value={dados.name}
                                  variant={'filled'}
                                  onChange={(e) =>
                                    onChange('name', e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-12 text-center mt-2">
                                <TextField
                                  required
                                  fullWidth
                                  label={'E-mail'}
                                  value={dados.email}
                                  variant={'filled'}
                                  onChange={(e) =>
                                    onChange('email', e.target.value)
                                  }
                                />
                              </div>
                              {/* </div> */}
                              {/* <div className="row p-2"> */}
                              <div className="col-md-12 text-center mt-2">
                                <Fab
                                  variant="extended"
                                  size="small"
                                  type="submit"
                                  style={{
                                    backgroundColor: '#b9d300',
                                  }}
                                  onClick={() => sendNewPassword()}>
                                  <Typography style={{ fontSize: '10px' }}>
                                    Enviar
                                  </Typography>
                                  <ChevronRightIcon
                                    className={classes.listItem}
                                  />
                                </Fab>
                              </div>
                            </div>
                          </Card>
                        </Paper>
                      </Box>
                      {/* </div> */}
                    </div>
                    {/* <div className="col-md-12">
          <Divider style={{ backgroundColor: 'black', marginTop: '25px' }} />
        </div> */}
                  </Box>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <div className={classes.root}>
          <Box>
            {/* <div className="col-md-12">
<Divider style={{ backgroundColor: 'black', marginBottom: '5px' }} />
</div> */}
            <div className="row">
              {/* <div className="col-md-12"> */}
              <Box
                p={5}
                style={{
                  // backgroundColor: '#7fffd43b',
                  width: '100%',
                }}>
                <Paper elevation={5} style={{ height: '100%' }}>
                  <Card
                    key={0}
                    style={{
                      width: '100%',
                      // backgroundColor: 'rgb(13, 74, 40)',
                      padding: '4%',
                    }}>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <Typography variant="h4">
                          Email enviado para{' '}
                          <b className="cor-verde-unimed">{dados.email}</b>, com
                          a nova senha!
                        </Typography>
                      </div>

                      {/* </div> */}
                      {/* <div className="row p-2"> */}
                      <div className="col-md-12 text-center mt-2">
                        <Fab
                          variant="extended"
                          size="medium"
                          type="submit"
                          style={{
                            backgroundColor: '#b9d300',
                          }}
                          onClick={() => HandleLogin()}>
                          <Typography style={{ fontSize: '10px' }}>
                            Fazer Login
                          </Typography>
                          <ChevronRightIcon className={classes.listItem} />
                        </Fab>
                      </div>
                    </div>
                  </Card>
                </Paper>
              </Box>
              {/* </div> */}
            </div>
            {/* <div className="col-md-12">
<Divider style={{ backgroundColor: 'black', marginTop: '25px' }} />
</div> */}
          </Box>
        </div>
      )}
    </>
  );
};

export default NewPassword;
