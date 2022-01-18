/* eslint-disable no-restricted-globals */
/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
import * as React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';

import {
  Box,
  Checkbox,
  Card,
  CardContent,
  Button,
  TextField,
  FormControlLabel,
  Paper,
} from '@mui/material';
import MuiAlert from '@material-ui/lab/Alert';

import { Snackbar } from '@material-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import DatePicker from '../datePicker';
import SelectField from '../selectField';
import APIUsers from '../../lib/api/users';
import Upload from '../uploads';
import FileList from '../fileList/index.tsx';
import TokenAPI from '../../lib/api/token';
import { FileProvider, useFiles } from '../context/files.tsx';
import { UploadContext } from '../../lib/context/upload-context';
import { Link, Redirect } from 'react-router-dom';
import { Container, Content } from './styles.ts';
import {
  Popper,
  Grow,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Avatar,
} from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';

// const label = { inputProps: { 'aria-label': 'Exibir por horário' } };
const User = (props) => {
  // const { handleUpload } = useFiles()
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const start = dayjs().startOf('month');
  const end = dayjs().endOf('month');
  const [success, setSuccess] = useState(false);
  const [perfis, setPerfis] = useState([]);
  const storage = TokenAPI.getToken();

  const filesElement = useRef(null);
  const { dadosUpload, setDadosUpload } = useContext(UploadContext);
  // const [dialogTerm, setDialogTerm] = useState(false);
  const vertical = 'top';
  const horizontal = 'center';
  const Message = (state) => {
    return <MuiAlert elevation={6} variant="filled" {...state} />;
  };

  const status = [
    { id: 0, descricao: 'Inativo' },
    { id: 1, descricao: 'Ativo' },
  ];
  // eslint-disable-next-line react/destructuring-assignment
  if (props?.data?.image && props?.data?.id && !dadosUpload) {
    setDadosUpload(props.data.image);
  }
  const sendFile = async () => {
    const dataForm = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    console.log(data);
  };

  const handleClose = () => {
    // setDialogTerm(false);
    setSuccess(false);
  };
  const initialProps = {
    id: 0,
    name: '',
    login: '',
    password: '',
    created_at: '',
    data_updated: '',
    active: 0,
    alterar: false,
  };

  const [filtros, setFiltros] = useState(
    (state) =>
      (state = history.state?.state?.data
        ? history.state?.state?.data
        : initialProps),
  );
  const [enabledPassword, setEnabledPassword] = useState(filtros.id === 0);

  // if (filtros?.id) {
  //   setEnabledPassword(true)
  // }

  useEffect(async () => {
    const resp = await APIUsers.getPerfis();
    setPerfis(resp);
  }, []);

  const onChange = (name, value) => {
    const campos = { ...filtros };
    console.log(name, value);
    if (value === 'Invalid Date') {
      campos[name] = null;
    } else {
      campos[name] = value;
    }

    if (name === 'alterar') {
      setEnabledPassword(value);
    }
    setFiltros(campos);
  };

  const onCancel = () => {
    setDadosUpload(null);
    // props.HandleRender(false)
    props.handleClose(false);
  };

  const EnabledPassword = (value) => {
    setEnabledPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const campos = {};
    // if (filtros.rg_date_begin_show !== null) {
    //   campos.rg_date_begin_show = dayjs(filtros.rg_date_begin_show).tz(
    //     'America/Sao_Paulo'
    //   )
    // }
    // if (filtros.rg_date_end_visu !== null) {
    //   campos.rg_date_end_visu = dayjs(filtros.rg_date_end_visu).tz(
    //     'America/Sao_Paulo'
    //   )
    // }
    const emailArray = filtros.email.split('@');
    campos.perfils = perfis.filter((e) => e.descricao === 'teste');
    if (emailArray[1] !== 'teste.com.br') {
      campos.perfils = perfis.filter((e) => e.descricao === 'externo');
    }
    const senhaMd5 = CryptoJS.MD5(`{tes${filtros.password}tes}`).toString();
    campos.name = filtros.name;
    campos.data_updated = dayjs().tz('America/Sao_Paulo').format();
    campos.login = filtros.login;
    campos.active = filtros.active;
    campos.email = filtros.email;
    campos.image = dadosUpload;

    let resp = {};
    if (filtros.id) {
      campos.id = filtros.id;
      resp = await APIUsers.updateUser(campos);
    } else {
      campos.password = senhaMd5;
      campos.created_at = dayjs().tz('America/Sao_Paulo').format();
      resp = await APIUsers.saveUser(campos);
    }

    if (resp?.data?.success) {
      if (storage?.name === campos?.name) {
        storage.image = dadosUpload;
      }
      TokenAPI.setToken(storage);
      setDadosUpload(null);
      setSuccess(resp?.data?.success);
      // props.handleClose(true)
    }
  };

  const FullName = {
    name: 'name',
    label: 'Nome Completo',
    value: filtros?.name || '',
  };
  const Username = {
    name: 'login',
    label: 'Login',
    value: filtros?.login || '',
  };
  const Email = {
    name: 'email',
    label: 'email',
    value: filtros?.email || '',
  };
  const Senha = {
    name: 'password',
    label: 'Password',
    value: filtros?.password || '',
  };
  const Active = {
    name: 'alterar',
    label: 'Alterar senha',
    value: filtros?.alterar || '',
  };

  const statusField = {
    type: 'select',
    name: 'active',
    label: 'Status',
    items: status || [],
    value: filtros?.active,
    config: { text: 'descricao', value: 'id' },
  };

  const action = (
    <Message color="success" severity="success">
      Usuário cadastrado com sucesso!
    </Message>
  );
  return (
    <>
      {success ? (
        <Redirect
          to={{
            pathname: `/login`,
            state: { success: success },
          }}
        />
      ) : (
        <Formik
          initialValues={filtros}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              // eslint-disable-next-line no-alert
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}>
          {(propsE) => {
            return (
              <form onSubmit={onSubmit}>
                <Box
                  style={{
                    padding: '1.3%',
                  }}>
                  <Card
                    style={{
                      height: '200%',
                      paddingLeft: '20%',
                      paddingRight: '20%',
                    }}>
                    <Paper
                      elevation={3}
                      style={{ margin: '15px', padding: '2%' }}>
                      <CardContent>
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <TextField
                              htmlfor="name"
                              required
                              value={FullName.value || ''}
                              className="w-100"
                              variant="filled"
                              label={FullName.label}
                              onChange={(v) =>
                                onChange(FullName.name, v.target.value)
                              }>
                              {' '}
                              {propsE.errors.name && (
                                <div className="input-feedback">
                                  {propsE.errors.name}
                                </div>
                              )}
                            </TextField>
                          </div>
                          <div className="col-md-12 mb-4">
                            <TextField
                              htmlfor="name"
                              required
                              value={Email.value || ''}
                              className="w-100"
                              variant="filled"
                              label={Email.label}
                              onChange={(v) =>
                                onChange(Email.name, v.target.value)
                              }>
                              {' '}
                              {propsE.errors.name && (
                                <div className="input-feedback">
                                  {propsE.errors.name}
                                </div>
                              )}
                            </TextField>
                          </div>
                          {/* <div className="col-md-2">
                        <SelectField data={statusField} onChange={onChange} />
                      </div> */}
                          {/*
                      <div className="col-md-6">
                        <DatePicker data={dataInicio} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataFim} onChange={onChange} />
                      </div> */}
                          <div className="col-md-12">
                            <TextField
                              className="w-100"
                              variant="filled"
                              value={Username.value || ''}
                              label={Username.label}
                              onChange={(v) =>
                                onChange(Username.name, v.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <TextField
                              className="w-100"
                              variant="filled"
                              disabled={!enabledPassword}
                              value={Senha.value || ''}
                              label={Senha.label}
                              onChange={(v) =>
                                onChange(Senha.name, v.target.value)
                              }
                            />
                          </div>
                          {filtros?.id ? (
                            <div
                              className="col-md-12 text-end"
                              // style={{
                              //   marginTop: '2%',
                              // }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Active.value}
                                    onClick={(v) =>
                                      onChange(Active.name, v.target.checked)
                                    }
                                  />
                                }
                                label={Active.label}
                              />
                            </div>
                          ) : null}
                          {/* <div className="col-md-6">
                        <DatePicker data={dataInicioVisu} onChange={onChange} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker data={dataFimVisu} onChange={onChange} />
                      </div>
                      <div className="col-md-12 mt-5">
                        <TextField
                          required
                          className="w-100"
                          value={descricao.value || ''}
                          label={descricao.label}
                          onChange={(v) =>
                            onChange(descricao.name, v.target.value)
                          }
                        />
                      </div> */}
                          {/* <div className="col-md-12 mt-5">
                        <TextField
                          required
                          className="w-100"
                          label={anexos.label}
                          onChange={(v) =>
                            onChange(anexos.name, v.target.value)
                          }
                        />
                      </div> */}
                          <div>
                            {/* <input type="file" multiple ref={filesElement} />
                        {/* eslint-disable-next-line react/button-has-type */}
                            {/* <button onClick={sendFile}>Send file</button> */}
                            <FileProvider>
                              <Container>
                                <Content>
                                  <Upload />
                                  <FileList />
                                </Content>
                                {/* <GlobalStyle /> */}
                              </Container>
                            </FileProvider>
                          </div>
                        </div>
                      </CardContent>
                      <div className="row">
                        <div className="col-md-12" style={{ textAlign: 'end' }}>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: '#ea0f63',
                              padding: '0px',
                            }}>
                            <MenuItem component={Link} to="/">
                              <h7>Cancelar</h7>
                            </MenuItem>
                          </Button>

                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: '#006600',
                            }}
                            type="submit">
                            <h7>Salvar</h7>
                            {/* <MenuItem component={Link} to="/">
                          Salvar
                        </MenuItem> */}
                          </Button>
                        </div>
                      </div>
                    </Paper>
                    {/* <CardActions
          style={{
            position: 'absolute',
            width: '100%',
          }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: '#ea0f63',
              position: 'absolute',
              marginLeft: '-80px',

              left: '5%',
            }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#006600',
              position: 'absolute',
              marginLeft: '-80px',

              right: '10%',
            }}>
            Salvar
          </Button>
        </CardActions> */}
                  </Card>
                </Box>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default User;
