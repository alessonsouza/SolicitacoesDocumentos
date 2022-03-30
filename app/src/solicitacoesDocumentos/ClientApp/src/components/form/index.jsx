/* eslint-disable no-use-before-define */
import { useState, useRef, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Paper,
  Typography,
  Fab,
} from '@mui/material';

import MuiAlert from '@material-ui/lab/Alert';

import { Snackbar } from '@material-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import DatePicker from '../datePicker';
import SelectField from '../selectField';
import APISolicitacoes from '../../lib/api/solicitacoes';
import APITipoSolicitante from '../../lib/api/tipoSolicitante';
import APITipoDocumento from '../../lib/api/tipoDocumento';
import APIMotivoSolicitacao from '../../lib/api/motivoSolicitacao';
import APITipoRetirada from '../../lib/api/tipoRetirada';
import Upload from '../uploads';
import FileList from '../fileList/index.tsx';
import { FileProvider, useFiles } from '../context/files.tsx';
import { UploadContext } from '../../lib/context/upload-context';

import { Container, Content } from './styles.ts';
import { CardTitle } from 'reactstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { type } from 'os';

const Register = (props) => {
  const { handleUpload } = useFiles();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const history = useHistory();
  const start = dayjs().startOf('month').format();
  const end = dayjs().endOf('month').format();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState('success');
  const [tipoSolicitante, setTipoSolicitante] = useState([]);
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [motivoSolicitacao, setMotivoSolicitacao] = useState([]);
  const [tipoRetirada, setTipoRetirada] = useState([]);
  const available = props.type === 'new' ? false : true;
  const filesElement = useRef(null);
  const { dadosUpload, setDadosUpload } = useContext(UploadContext);
  // const [dialogTerm, setDialogTerm] = useState(false);
  const vertical = 'top';
  const horizontal = 'center';
  const status = [
    { id: 'concluido', descricao: 'Concluido' },
    { id: 'andamento', descricao: 'Em Andamento' },
    { id: 'cancelado', descricao: 'Cancelado' },
  ];

  const [requerenteChecked, setRequerenteChecked] = useState();
  const [documentoChecked, setDocumentoChecked] = useState();
  const [retiradaChecked, setRetiradaChecked] = useState();

  // eslint-disable-next-line react/destructuring-assignment
  // if (props?.data?.rg_document && props?.data?.rg_id_events && !dadosUpload) {
  //   setDadosUpload(props.data.rg_document);
  // }

  const Message = (state) => {
    return <MuiAlert elevation={6} variant="filled" {...state} />;
  };

  const handleClose = () => {
    // setDialogTerm(false);
    setSuccess(false);
  };
  const initialProps = {
    nomePaciente: '',
    cpfPaciente: '',
    rgPaciente: '',
    dataNascPaciente: '',
    telefone: '',
    email: '',
    nomeSolicitannte: '',
    rgSolicitante: '',
    cpfSolicitante: '',
    dataSolicitacao: dayjs().tz('America/Sao_Paulo').format(),
    confirmacaoLeitura: 1,
    grauParentesco: null,
    tipoRequerente: null,
    tipoDocumento: null,
    tipoRetirada: null,
    statusSolicitacao: null,
    motivoSolicitacao: null,
    created_at: dayjs().tz('America/Sao_Paulo').format(),
  };

  const [filtros, setFiltros] = useState(
    (state) => (state = props?.data ? props.data : initialProps),
  );
  const arquivos = filtros.documentos?.filter((e) => e.origem === 'S');

  const onChange = (name, value) => {
    const campos = { ...filtros };
    // if (value === 'Invalid Date') {
    //   campos[name] = null;
    // } else {
    campos[name] = value;
    // }
    setFiltros(campos);
  };

  const onChangeClasses = (name, value) => {
    const campos = { ...filtros };
    if (name === 'motivoSolicitacao') {
      campos[name] = motivoSolicitacao.filter((e) => e.id === value);
      // campos[name] = parseInt(campos[name][0].id, 10);
      campos[name] = campos[name][0];
      setFiltros(campos);
      return;
    } else {
      campos[name] = value;
    }

    setFiltros(campos);
  };

  const handleChangeRequerente = (name, event) => {
    const campos = { ...filtros };
    campos[name] = tipoSolicitante.filter(
      (e) => e.id === parseInt(event.target.value, 10),
    );
    campos[name] = campos[name][0];
    setFiltros(campos);
    setRequerenteChecked(event.target.value);
    // onChange('TipoRequerenteId', event.target.value);
  };

  const handleChangeDocumento = (name, event) => {
    const campos = { ...filtros };
    campos[name] = tipoDocumento.filter(
      (e) => e.id === parseInt(event.target.value, 10),
    );
    campos[name] = campos[name][0];
    setFiltros(campos);
    setDocumentoChecked(event.target.value);
    // onChange('TipoDocumentoId', event.target.value);
  };

  const handleChangeRetirada = (name, event) => {
    const campos = { ...filtros };
    campos[name] = tipoRetirada.filter(
      (e) => e.id === parseInt(event.target.value, 10),
    );
    campos[name] = campos[name][0];
    setFiltros(campos);
    setRetiradaChecked(event.target.value);
    // onChange('TipoDocumentoId', event.target.value);
  };

  const onCancel = () => {
    setDadosUpload(null);
    // props.HandleRender(false)
    props.handleClose(false);
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
    // campos.rg_date_end_visu = dayjs(filtros.rg_date_end_visu)
    //   .tz('America/Sao_Paulo')
    //   .format();
    // }

    // campos.rg_document = dadosUpload;
    let resp = {};
    // if (filtros.id) {
    //   campos.rg_id_events = filtros.rg_id_events;
    //   resp = await APIEventos.updateEvent(campos);
    // } else {
    // filtros.StatusSolicitacaoid = 1;
    filtros.statusSolicitacao = {
      id: 1,
      // descStatus: 'Pendente',
      // status: 1,
    };
    // filtros.TipoRetiradaid = 1;
    // filtros.tipoRetirada = {
    //   id: 1,
    //   // status: 1,
    //   // descRetirada: 'online',
    // };
    filtros.Documentos = dadosUpload;
    resp = await APISolicitacoes.insert(filtros);
    // }

    if (resp?.success) {
      setDadosUpload(null);
      // props.handleClose(true)
      if (props.type === 'new') {
        props?.handleNext();
        props?.getStepNameButton(2);
      }
    }

    if (
      resp?.title === 'One or more validation errors occurred.' ||
      resp.error === 'Object reference not set to an instance of an object.'
    ) {
      setSuccess(true);
      setMessage('Preencha todos os campos!');
      setTypeMessage('error');
    }
  };

  const GoBack = () => {
    history.push({
      pathname: '/request-list',
      state: { type: 'list', status: 'new' },
    });
  };

  useEffect(async () => {
    const resp = await APITipoSolicitante.getAll();
    setTipoSolicitante(resp?.data);
  }, []);

  useEffect(async () => {
    const resp = await APITipoDocumento.getAll();
    setTipoDocumento(resp?.data);
  }, []);

  useEffect(async () => {
    const resp = await APIMotivoSolicitacao.getAll();
    setMotivoSolicitacao(resp?.data);
  }, []);

  useEffect(async () => {
    const resp = await APITipoRetirada.getAll();
    setTipoRetirada(resp?.data);
  }, []);

  const dataNasc = {
    name: 'dataNascPaciente',
    label: 'Data Nascimento',
    value: filtros?.dataNascPaciente || '',
    format: 'YYYY-MM-DDTHH:mm-03:00',
  };
  const data = {
    name: 'dataSolicitacao',
    label: 'Data',
    value: filtros?.dataSolicitacao || '',
    format: 'YYYY-MM-DDTHH:mm-03:00',
  };
  const namePaciente = {
    name: 'nomePaciente',
    label: 'Nome',
    value: filtros?.nomePaciente || '',
  };

  const nameRequerente = {
    name: 'nomeSolicitannte',
    label: 'Nome',
    value: filtros?.nomeSolicitannte || '',
  };
  const telContato = {
    name: 'telefone',
    label: 'telefone',
    value: filtros?.telefone || '',
  };
  const email = {
    name: 'email',
    label: 'email',
    value: filtros?.email || '',
  };
  const anexos = {
    name: 'rg_documents',
    label: 'Anexos',
    value: filtros?.rg_document || '',
  };
  const site = {
    name: 'rg_site',
    label: 'Nome',
    value: filtros?.rg_site || '',
  };
  const cpfPaciente = {
    name: 'cpfPaciente',
    label: 'CPF',
    value: filtros?.cpfPaciente || '',
  };
  const rgPaciente = {
    name: 'rgPaciente',
    label: 'RG',
    value: filtros?.rgPaciente || '',
  };

  const cpfRequerente = {
    name: 'cpfSolicitante',
    label: 'CPF',
    value: filtros?.cpfSolicitante || '',
  };
  const rgRequerente = {
    name: 'rgSolicitante',
    label: 'RG',
    value: filtros?.rgSolicitante || '',
  };
  const motivo = {
    name: 'descMotivo',
    label: 'Motivo',
    value: filtros?.descMotivo || '',
  };

  const motivoSoli = {
    name: 'descStatus',
    label: 'Motivo',
    value: filtros?.descStatus || '',
  };

  const parentesco = {
    name: 'grauParentesco',
    label: 'Grau Parentesco',
    value: filtros?.grauParentesco || '',
  };

  const statusField = {
    type: 'select',
    name: 'motivoSolicitacao',
    label: 'Motivo',
    items: motivoSolicitacao || [],
    value: filtros?.motivoSolicitacao?.id,
    config: { text: 'descMotivo', value: 'id' },
  };

  const action = (
    <Message color={typeMessage} severity={typeMessage}>
      {message}
    </Message>
  );
  return (
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
            <Box>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}>
                {action}
              </Snackbar>
              <Card style={{ paddingRight: '12%', paddingLeft: '12%' }}>
                <Paper elevation={8} style={{ margin: '15px' }}>
                  <CardTitle
                    style={{
                      backgroundColor: '#006600',
                      paddingTop: '14px',
                      paddingBottom: '5px',
                      paddingLeft: '10px',
                      color: 'white',
                    }}>
                    <h5>
                      <p>Dados Contatos</p>
                    </h5>
                  </CardTitle>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-6">
                        <TextField
                          size="small"
                          htmlfor="rg_title"
                          disabled={available}
                          required
                          value={telContato.value || ''}
                          className="w-100"
                          variant="filled"
                          label={telContato.label}
                          onChange={(v) =>
                            onChange(telContato.name, v.target.value)
                          }>
                          {' '}
                          {propsE.errors.rg_title && (
                            <div className="input-feedback">
                              {propsE.errors.rg_title}
                            </div>
                          )}
                        </TextField>
                      </div>
                      <div className="col-md-6">
                        <TextField
                          size="small"
                          htmlfor="rg_title"
                          required
                          disabled={available}
                          value={email.value || ''}
                          className="w-100"
                          variant="filled"
                          label={email.label}
                          onChange={(v) =>
                            onChange(email.name, v.target.value)
                          }>
                          {' '}
                          {propsE.errors.rg_title && (
                            <div className="input-feedback">
                              {propsE.errors.rg_title}
                            </div>
                          )}
                        </TextField>
                      </div>
                    </div>
                  </CardContent>
                </Paper>
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
                      <div className="col-md-10">
                        <TextField
                          required
                          disabled={available}
                          className="w-100"
                          variant="filled"
                          value={namePaciente.value || ''}
                          label={namePaciente.label}
                          onChange={(v) =>
                            onChange(namePaciente.name, v.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-2">
                        <DatePicker
                          required
                          disabled={available}
                          data={dataNasc}
                          onChange={onChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          required
                          disabled={available}
                          className="w-100"
                          variant="filled"
                          value={cpfPaciente.value || ''}
                          label={cpfPaciente.label}
                          onChange={(v) =>
                            onChange(cpfPaciente.name, v.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          required
                          disabled={available}
                          className="w-100"
                          variant="filled"
                          value={rgPaciente.value || ''}
                          label={rgPaciente.label}
                          onChange={(v) =>
                            onChange(rgPaciente.name, v.target.value)
                          }
                        />
                      </div>
                      {/* <div className="col-md-6">
                        <DatePicker data={dataFim} onChange={onChange} />
                      </div> */}
                    </div>
                  </CardContent>
                </Paper>
                <Paper elevation={8} style={{ margin: '15px' }}>
                  <CardTitle
                    style={{
                      backgroundColor: '#006600',
                      paddingTop: '14px',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      color: 'white',
                    }}>
                    <h5>Requerente</h5>
                  </CardTitle>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-12">
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="Requerente"
                            name="Requerente"
                            value={parseInt(
                              requerenteChecked || filtros.tipoRequerente?.id,
                              10,
                            )}
                            onChange={(e) =>
                              handleChangeRequerente('tipoRequerente', e)
                            }>
                            {tipoSolicitante &&
                              tipoSolicitante.map((solicitante) => {
                                return (
                                  <FormControlLabel
                                    key={solicitante.id}
                                    value={solicitante.id}
                                    disabled={available}
                                    control={<Radio />}
                                    label={solicitante.descRequerente}
                                  />
                                );
                              })}
                            {/* <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Responsável pela internação"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Representante Legal"
                            />
                            <FormControlLabel
                              value="disabled"
                              control={<Radio />}
                              label="Familiar (em caso de paciente já falecido)"
                            /> */}
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
                <Paper elevation={8} style={{ margin: '15px' }}>
                  <CardTitle
                    style={{
                      backgroundColor: '#006600',
                      paddingTop: '14px',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      color: 'white',
                    }}>
                    <h5>
                      Dados do Requerente caso não seja o próprio paciente
                    </h5>
                  </CardTitle>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-12">
                        <TextField
                          required
                          className="w-100"
                          variant="filled"
                          disabled={available}
                          value={nameRequerente.value || ''}
                          label={nameRequerente.label}
                          onChange={(v) =>
                            onChange(nameRequerente.name, v.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          required
                          disabled={available}
                          className="w-100"
                          variant="filled"
                          value={cpfRequerente.value || ''}
                          label={cpfRequerente.label}
                          onChange={(v) =>
                            onChange(cpfRequerente.name, v.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          required
                          disabled={available}
                          className="w-100"
                          variant="filled"
                          value={rgRequerente.value || ''}
                          label={rgRequerente.label}
                          onChange={(v) =>
                            onChange(rgRequerente.name, v.target.value)
                          }
                        />
                      </div>
                      {requerenteChecked === '3' && (
                        <div className="col-md-6">
                          <TextField
                            disabled={available}
                            className="w-100"
                            variant="filled"
                            value={parentesco.value || ''}
                            label={parentesco.label}
                            onChange={(v) =>
                              onChange(parentesco.name, v.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Paper>
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
                            value={parseInt(
                              documentoChecked || filtros.tipoDocumento?.id,
                              10,
                            )}
                            onChange={(e) =>
                              handleChangeDocumento('tipoDocumento', e)
                            }>
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
                <Paper elevation={8} style={{ margin: '15px' }}>
                  <CardTitle
                    style={{
                      backgroundColor: '#006600',
                      paddingTop: '14px',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      color: 'white',
                    }}>
                    <h5>Forma de Retirada</h5>
                  </CardTitle>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-12">
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={parseInt(
                              retiradaChecked || filtros.tipoRetirada?.id,
                              10,
                            )}
                            onChange={(e) =>
                              handleChangeRetirada('tipoRetirada', e)
                            }>
                            {tipoRetirada &&
                              tipoRetirada.map((retirada) => {
                                return (
                                  <FormControlLabel
                                    key={retirada.id}
                                    value={retirada.id}
                                    control={<Radio />}
                                    disabled={available}
                                    label={retirada.descRetirada}
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
                <Paper elevation={8} style={{ margin: '15px' }}>
                  <CardTitle
                    style={{
                      backgroundColor: '#006600',
                      paddingTop: '14px',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      color: 'white',
                    }}>
                    <h5>Motivo da solicitação</h5>
                  </CardTitle>
                  <CardContent>
                    <div className="row">
                      {/* <div className="col-md-6">
                        <DatePicker data={dataFimVisu} onChange={onChange} />
                      </div> */}
                      {/* <div className="col-md-12 "> */}
                      {/* <TextField
                          required
                          className="w-100"
                          value={motivo.value || ''}
                          label={motivo.label}
                          onChange={(v) =>
                            onChange(motivo.name, v.target.value)
                          }
                        /> */}
                      <div className="col-md-4">
                        <SelectField
                          disabled={available}
                          data={statusField}
                          onChange={onChangeClasses}
                        />
                      </div>
                      {/* </div> */}
                      <div className="col-md-4">
                        <DatePicker
                          disabled={available}
                          data={data}
                          onChange={onChange}
                        />
                      </div>
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
                              {props.type === 'new' && <Upload />}
                              <FileList type={'S'} docs={arquivos || []} />
                            </Content>
                            {/* <GlobalStyle /> */}
                          </Container>
                        </FileProvider>
                      </div>
                      {props.type === 'new' && (
                        <div className="text-center">
                          <Fab
                            // disabled={activeStep === 0}
                            variant="extended"
                            size="medium"
                            onClick={
                              props.type === 'new' &&
                              props?.getStepNameButton(2)
                            }
                            type="submit"
                            style={{
                              backgroundColor: '#006600',
                              width: '30%',
                              textAlign: 'center',
                              marginBottom: '10px',
                            }}>
                            <Typography style={{ fontSize: '12px' }}>
                              <b>Salvar</b>
                            </Typography>
                          </Fab>
                        </div>
                      )}
                      {props.data && (
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
                      )}
                      {/* <div
                        className="col-md-4"
                        // style={{
                        //   marginTop: '2%',
                        // }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={rg.value}
                              onClick={(v) =>
                                onChange(rg.name, v.target.checked)
                              }
                            />
                          }
                          label={rg.label}
                        />
                      </div> */}
                    </div>
                  </CardContent>
                </Paper>

                {/* <div className="row">
                  <div className="col-md-12" style={{ textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#ea0f63',
                      }}
                      onClick={() => onCancel()}>
                      Cancelar
                    </Button>

                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#006600',
                      }}
                      type="submit">
                      Salvar
                    </Button>
                  </div>
                </div> */}

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
  );
};

export default Register;
