/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import {
  Typography,
  Box,
  Grid,
  Fab,
  Card,
  Divider,
  Paper,
  CardContent,
} from '@material-ui/core';

import { Button } from '@mui/material';

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import Carousel from 'react-multi-carousel';
import APIEventos from '../../lib/api/eventos';
import Form from '../form';
import AllEvents from '../todosEventos';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/colors.css';
import '../../index.css';
// eslint-disable-next-line import/no-unresolved
import endpoint from '../../endpoints.config';
// eslint-disable-next-line no-multi-assign
// window.$ = window.jQuery = require('jquery')
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import MuiAlert from '@material-ui/lab/Alert';

import { Snackbar } from '@material-ui/core';

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

// const label = { inputProps: { 'aria-label': 'Exibir por horário' } };

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}>
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(45deg, #006600 30%, #048604  95%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(45deg, #006600 30%, #048604  95%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(45deg, #006600 30%, #FF8E53 96%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(45deg, #006600 20%, #FF8E53 98%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function getSteps() {
  return [
    'Intruções e Informações legais',
    'Solicitação dos Documentos',
    'Finalizando',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Leia atentamente antes de prosseguir!';
    case 1:
      return 'Preencha todos os campos obrigatórios!';
    default:
      return '';
  }
}

function getStepNameButton(step) {
  switch (step) {
    case 0:
      return 'Solicitar Documentos';
    case 1:
      return 'Cancelar Solicitação';
    case 2:
      return 'Nova Solicitação';
    default:
      return 'não há informações';
  }
}

const Home = () => {
  const classes = useStyles();
  const customerLogo = useRef(null);
  const [events, setEvents] = useState([]);
  const [showType, setShowType] = useState(0);
  const [event, setEvent] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [success, setSuccess] = useState(
    // eslint-disable-next-line no-restricted-globals
    history.state?.state?.success || false,
  );
  const vertical = 'top';
  const horizontal = 'center';

  const Message = (state) => {
    return <MuiAlert elevation={6} variant="filled" {...state} />;
  };

  const HandleShow = (type, dados) => {
    setShowType(type);
    setEvent(dados);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    HandleShow((value) => value + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    HandleShow((value) => value - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClose = () => {
    // setDialogTerm(false);
    setSuccess(false);
  };

  const HandleTypeRender = () => {
    let html;
    switch (showType) {
      case 0:
        html = (
          <Box>
            <Card style={{ paddingRight: '15%', paddingLeft: '15%' }}>
              <CardContent>
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 600,
                      color: 'gray',
                      textAlign: 'center',
                    }}>
                    {`I don't see what I'm doing wrong...and it's works if I do the deleteRecords by hand in the Chrome console.

here is the grid:
               

and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)
    
and here is the call to deleteRecords.  I've stripped it down to just this:

function assignSMSsARama() {
    var dataGrid = null;
  


and here's the error I see in the console:
constants.js:93 Uncaught TypeError: Cannot read property 'getAttribute' of undefined
    at e.deleteRow (constants.js:93)
    at t.deleteRow (constants.js:93)
    at assignSMSsARama (Unassigned.js:137)
    at assignARama (Unassigned.js:46)
    at HTMLButtonElement.onclick (unassigned:184)

Any help would be welcomed.`}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Box>
        );
        break;
      case 1:
        // $('alesson').addClass('position-relative')
        html = (
          <Form
            data={event}
            type={'new'}
            HandleShow={HandleShow}
            getStepNameButton={getStepNameButton}
            handleNext={handleNext}
          />
        );
        break;
      case 2:
        html = (
          <Typography
            variant="h2"
            style={{
              fontWeight: 600,
              color: '#006600',
              textAlign: 'center',
              marginTop: '65px',
              height: '300px',
            }}>
            Enviado para aprovação!
          </Typography>
        );
        break;

      default:
        break;
    }
    return html;
  };

  const action = (
    <Message color="success" severity="success">
      Usuário cadastrado com sucesso!
    </Message>
  );

  return (
    <div className={classes.root}>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}>
        {action}
      </Snackbar>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
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
        <Card>{HandleTypeRender()}</Card>
        <Card>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className="text-center">
                  <Fab
                    variant="extended"
                    size="medium"
                    onClick={activeStep >= 1 ? handleBack : handleNext}
                    style={{
                      backgroundColor: '#f5781e',
                      textAlign: 'flex-end',
                      marginBottom: '10px',
                    }}>
                    {/* <ChevronLeftIcon className={classes.extendedIcon} /> */}
                    <Typography style={{ fontSize: '12px' }}>
                      <b>{getStepNameButton(activeStep)}</b>
                    </Typography>
                  </Fab>
                </div>
              </div>
            )}
          </div>
        </Card>
        <Box style={{ width: '100%', height: '100%' }}>
          <div className="col-md-12 text-end">
            <Divider style={{ backgroundColor: 'black', marginTop: '15px' }} />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
