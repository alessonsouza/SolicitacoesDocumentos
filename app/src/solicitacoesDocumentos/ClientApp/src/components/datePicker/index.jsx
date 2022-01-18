/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
import 'date-fns'

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import React, { useEffect, useState } from 'react'

import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import deLocale from 'date-fns/locale/pt-BR'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Icon from '@mdi/react'
import { mdiCalendarClock } from '@mdi/js'

import './timepicker.css'

const MaterialUIPickers = (props) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const [selectedDate, setSelectedDate] = useState(null)
  const dados = props

  const formatarData = (data) => {
    const [dia, mes, ano, hora] = data.split(/[\/\s]/)
    return `${ano}-${`0${mes}`.slice(-2)}-${`0${dia}`.slice(-2)}T${hora}-03:00`
  }

  useEffect(() => {
    setSelectedDate(props.data.value)
  }, [props])

  useEffect(() => {
    const formato = 'YYYY-MM-DDTHH:mm-03:00'
    // const formato = '[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]';
    if (props.data.value) {
      const invalid =
        props.data.value !== 'Invalid Date' &&
        props.data.value !== 'Invalid date'
      if (props.data.value.length <= 16 && invalid) {
        setSelectedDate(formatarData(props.data.value))
        return
      }
      if (!props.data.value.length && invalid) {
        setSelectedDate(
          dayjs(props.data.value).tz('America/Sao_Paulo').format(formato)
        )
      }
      return
    }

    if (!(typeof props.data.edicao === 'undefined')) {
      setSelectedDate(
        !props.data.edicao
          ? dayjs().tz('America/Sao_Paulo').format(formato)
          : props.data.value
      )
      return
    }

    setSelectedDate(props.data.value)
  })

  const handleDateChange = (date) => {
    props.onChange(
      props.data.name,
      dayjs(date).tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm-03:00')
    )
    setSelectedDate(date)
  }

  //   const handleError = (error, value) => {
  //     console.log(error + value);
  //   };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
      <Grid container justify="space-around">
        <KeyboardDateTimePicker
          ampm={false}
          autoOk
          variant="dialog"
          format="dd/MM/yyyy HH:mm"
          margin="normal"
          id="date-picker-dialog"
          label={dados.data.label}
          value={selectedDate}
          onChange={handleDateChange}
          keyboardIcon={
            <Icon
              path={mdiCalendarClock}
              title="Pesquisar"
              size={1}
              color="black"
            />
          }
          showTodayButton
          todayLabel="Hoje"
          cancelLabel="Cancelar"
          style={{ marginTop: 0, color: 'black' }}
          fullWidth
          // eslint-disable-next-line consistent-return

          invalidDateMessage="Data/Hora inválida!"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default MaterialUIPickers
