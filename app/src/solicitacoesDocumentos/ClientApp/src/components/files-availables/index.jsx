import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import {
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
  Fab,
} from '@mui/material';

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Divider,
} from '@material-ui/core';
import { CardTitle } from 'reactstrap';
import { Container, Content } from './styles.ts';
import DatePicker from '../datePicker';
import Upload from '../uploads';
import Home from '../home';
import FileList from '../fileList/index.tsx';
import { FileProvider } from '../context/files.tsx';
import { UploadContext } from '../../lib/context/upload-context';
import { AuthContext } from '../../lib/context/auth-context';
import APITipoDocumento from '../../lib/api/tipoDocumento';
import APISolicitacoes from '../../lib/api/solicitacoes';
import TokenAPI from '../../lib/api/token';
import { Formik } from 'formik';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    backgroundColor: theme.palette.background2.dark,
    // backgroundImage: theme.palette.backgroundImage,
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
  root2: {
    width: '100%',
  },
  button: {
    textAlign: 'center',
    marginRight: theme.spacing(1),
  },
  instructions: {
    textAlign: 'center',
    color: '#006600',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const FilesAvailables = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState(props.data || []);
  const [redirected, setRedirected] = useState(false);
  const { id } = useParams();
  const storage = TokenAPI.getToken();
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [notDocumentsAvailable, setNotDocumentsAvailable] = useState(false);
  const { dadosUpload, setDadosUpload } = useContext(UploadContext);
  const { dadosUser } = useContext(AuthContext);
  const available = true;
  let arquivos = state?.documentos?.filter((e) => e.origem === 'U');
  useEffect(async () => {
    const resp = await APISolicitacoes.getSolicitacaoByID(
      id,
      // dadosUser?.created_at || storage?.created_at,
    );

    if (resp?.data?.length) {
      arquivos = resp?.documentos?.filter((e) => e.origem === 'U');
      setState(resp.data[0]);
    } else if (resp?.data === 5) {
      setNotDocumentsAvailable(true);
    }
  }, []);

  useEffect(async () => {
    const resp = await APITipoDocumento.getAll();

    setTipoDocumento(resp?.data);
  }, []);

  const HandleHome = () => {
    setRedirected(true);
  };

  const GoBack = () => {
    history.push(
      props.from === 'unimed'
        ? {
            pathname: '/request-list',
            state: { type: 'list', status: 'new' },
          }
        : { pathname: '/' },
    );
  };
  const dataNasc = {
    name: 'DataNascPaciente',
    label: 'Data Nascimento',
    value: state?.dataNascPaciente || '',
    format: 'YYYY-MM-DDTHH:mm-03:00',
  };

  const namePaciente = {
    name: 'NomePaciente',
    label: 'Nome',
    value: state?.nomePaciente || '',
  };
  const cpfPaciente = {
    name: 'CPFPaciente',
    label: 'CPF',
    value: state?.cpfPaciente || '',
  };
  const rgPaciente = {
    name: 'RGPaciente',
    label: 'RG',
    value: state?.rgPaciente || '',
  };

  const RenderInfoPaciente = () => {
    return (
      <Card>
        <Paper elevation={8} style={{ margin: '15px' }}>
          <CardTitle
            style={{
              backgroundColor: '#006600',
              paddingTop: '14px',
              paddingLeft: '10px',
              paddingBottom: '5px',
              color: 'white',
            }}>
            <h5>Dados do Paciente</h5>
          </CardTitle>
          <CardContent>
            <div className="row">
              <div className="col-md-12">
                <TextField
                  disabled={available}
                  className="w-100"
                  variant="filled"
                  value={namePaciente.value || ''}
                  label={namePaciente.label}
                />
              </div>
              <div className="col-md-6">
                <DatePicker disabled={available} data={dataNasc} />
              </div>
              <div className="col-md-6">
                <TextField
                  className="w-100"
                  disabled={available}
                  variant="filled"
                  value={cpfPaciente.value || ''}
                  label={cpfPaciente.label}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  disabled={available}
                  className="w-100"
                  variant="filled"
                  value={rgPaciente.value || ''}
                  label={rgPaciente.label}
                />
              </div>
              {/* <div className="col-md-6">
                        <DatePicker data={dataFim} onChange={onChange} />
                      </div> */}
            </div>
          </CardContent>
        </Paper>
      </Card>
    );
  };

  const RenderDocumentsRequested = () => {
    return (
      <Card>
        <Paper elevation={8} style={{ margin: '15px' }}>
          <CardTitle
            style={{
              backgroundColor: '#006600',
              paddingTop: '14px',
              paddingLeft: '10px',
              paddingBottom: '5px',
              color: 'white',
            }}>
            <h5>Documento Solicitado</h5>
          </CardTitle>
          <CardContent>
            <div className="row">
              <div className="col-md-12">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={parseInt(state?.tipoDocumento?.id, 10)}>
                    {tipoDocumento &&
                      tipoDocumento.map((documento) => {
                        return (
                          <FormControlLabel
                            key={documento.id}
                            value={documento.id}
                            disabled={available}
                            control={<Radio />}
                            label={documento.descDocumento}
                          />
                        );
                      })}
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <div className="col-md-6">
                        <TextField
                          className="w-100"
                          variant="filled"
                          value={cpf.value || ''}
                          label={cpf.label}
                          onChange={(v) => onChange(cpf.name, v.target.value)}
                        />
                      </div> */}
            </div>
          </CardContent>
        </Paper>
      </Card>
    );
  };

  const UploadFiles = () => {
    return (
      <Card>
        <Paper elevation={8} style={{ margin: '15px' }}>
          {/* <input type="file" multiple ref={filesElement} />
        {/* eslint-disable-next-line react/button-has-type */}
          {/* <button onClick={sendFile}>Send file</button> */}
          <FileProvider>
            <Container>
              <Content>
                {props.data &&
                  state?.statusSolicitacao?.descStatus !== 'Arquivado' && (
                    <Upload />
                  )}
                <FileList type={'U'} docs={arquivos || []} />
              </Content>
              {/* <GlobalStyle /> */}
            </Container>
          </FileProvider>
          {props.data && state?.statusSolicitacao?.descStatus !== 'Arquivado' && (
            <div className="text-center">
              <Fab
                // disabled={activeStep === 0}
                variant="extended"
                size="medium"
                // onClick={() => }
                type="submit"
                style={{
                  backgroundColor: '#006600',
                  width: '30%',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}>
                <Typography style={{ fontSize: '12px' }}>
                  <b>Enviar</b>
                </Typography>
              </Fab>
            </div>
          )}
          <div className="text-center">
            <Fab
              // disabled={activeStep === 0}
              variant="extended"
              size="medium"
              onClick={() => GoBack()}
              style={{
                backgroundColor: '#f5781e',
                width: '30%',
                textAlign: 'center',
                marginBottom: '10px',
              }}>
              <Typography style={{ fontSize: '12px' }}>
                <b>Voltar</b>
              </Typography>
            </Fab>
          </div>
        </Paper>
      </Card>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const campos = {};
    // if (filtros.rg_date_begin_show !== null) {
    //   campos.rg_date_begin_show = dayjs(filtros.rg_date_begin_show)
    //     .tz('America/Sao_Paulo')
    //     .format();
    // }
    // if (filtros.rg_date_end_visu !== null) {

    let resp = {};
    if (state.id) {
      // filtros.StatusSolicitacaoid = 1;
      state.StatusSolicitacao = {
        id: 3,
        // descStatus: 'Pendente',
        // status: 1,
      };
      // state.TipoRetiradaid = 1;
      state.TipoRetirada = {
        id: 2,
        // status: 1,
        // descRetirada: 'online',
      };
      state.Documentos = dadosUpload?.filter((e) => !e.id);
      resp = await APISolicitacoes.update(state);
    }

    if (resp?.success) {
      // setDadosUpload(null);
      props.HandleRender('list');
      // props.handleClose(true)
      // props.handleNext();
      // props.getStepNameButton(2);
    }
  };

  return (
    <>
      {!notDocumentsAvailable ? (
        <Formik
          initialValues={state}
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
                {RenderInfoPaciente()}
                {RenderDocumentsRequested()}
                {UploadFiles()}
              </form>
            );
          }}
        </Formik>
      ) : !redirected ? (
        <div className={classes.root}>
          <Box>
            <Box p={2}>
              <div>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 600,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Requerimento de Prontuário Médico do Paciente
                </Typography>
              </div>
            </Box>
            <Card>
              {' '}
              <Typography
                variant="h2"
                style={{
                  fontWeight: 600,
                  color: '#006600',
                  textAlign: 'center',
                  marginTop: '65px',
                  height: '300px',
                }}>
                Os documentos não estão mais disponíveis!
              </Typography>
              <div className="text-center">
                <Fab
                  variant="extended"
                  size="medium"
                  onClick={() => HandleHome()}
                  style={{
                    backgroundColor: '#f5781e',
                    textAlign: 'flex-end',
                    marginBottom: '10px',
                  }}>
                  {/* <ChevronLeftIcon className={classes.extendedIcon} /> */}
                  <Typography style={{ fontSize: '12px' }}>
                    <b>Nova Solicitação</b>
                  </Typography>
                </Fab>
              </div>
            </Card>

            <Box style={{ width: '100%', height: '100%' }}>
              <div className="col-md-12 text-end">
                <Divider
                  style={{ backgroundColor: 'black', marginTop: '15px' }}
                />
              </div>
            </Box>
          </Box>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default FilesAvailables;
