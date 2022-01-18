/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TablePagination from '@mui/material/TablePagination'
// import TableRow from '@mui/material/TableRow'
// import TableSortLabel from '@mui/material/TableSortLabel'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Card,
  CardContent,
  TextField,
  Fab,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material'
// import Badge from '@material-ui/core/Badge'
import Badge from 'react-bootstrap/Badge'
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton'
// import Tooltip from '@mui/material/Tooltip'
import { Alert, AlertTitle } from '@material-ui/lab'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import { mdiMagnify, mdiPlus, mdiBorderColor, mdiDelete } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Form from '../form-user'
import APIUsers from '../../lib/api/users'
import { UploadContext } from '../../lib/context/upload-context'
import DatePicker from '../datePicker'

// import Home from '../home';
// import { Redirect } from 'react-router-dom';

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];
import './data.css'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const styles = (theme) => ({
  field: {
    backgroundColor: '#006600'
  }
})

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Nome'
  },
  {
    id: 'Login',
    align: 'center',
    disablePadding: false,
    label: 'Login'
  },

  {
    id: 'active',
    align: 'right',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'created',
    align: 'right',
    disablePadding: false,
    label: 'Data criação'
  },
  {
    id: 'updated',
    align: 'right',
    disablePadding: false,
    label: 'Data Atualização'
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Ações'
  }
]

function EnhancedTableHead (props) {
  const {
    order,
    orderBy,

    onRequestSort
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            className="bg-cinza-claro">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
  // rowCount: PropTypes.number.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}>
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : ( */}
      {/* <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div">
        Eventos
      </Typography> */}
      {/* )} */}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : ( */}
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {/* )} */}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default function EnhancedTable () {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [changeRender, setChageRender] = useState(false)
  const [events, setEvents] = useState([])

  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [item, setItem] = useState(null)
  const vertical = 'top'
  const horizontal = 'center'
  const { setDadosUpload } = useContext(UploadContext)
  const start = dayjs().startOf('month')
  const end = dayjs().endOf('month')

  const initialProps = {
    idauth: 0,
    auth_name: '',
    auth_login: '',
    auth_password: '',
    auth_data_created: '',
    auth_data_updated: '',
    auth_active: 0,
    alterar: false
  }

  const [filtros, setFiltros] = useState((state) => (state = initialProps))

  const Message = (state) => {
    return <MuiAlert elevation={6} variant="filled" {...state} />
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = events.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const onChange = (name, value) => {
    const campos = { ...filtros }
    console.log(name, value)
    if (value === 'Invalid Date') {
      campos[name] = null
    } else {
      campos[name] = value
    }
    setFiltros(campos)
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const HandleEvents = async () => {
    const campos = {}
    campos.auth_name = filtros.auth_name
    const resp = await APIUsers.allUsers(campos)
    if (resp?.success) {
      console.log(resp)
      setEvents(resp.data)
    }
  }

  const HandleRender = (value) => {
    // HandleEvents()

    if (value === false) {
      window.location.reload()
    }
    setChageRender(value)
    console.log(changeRender)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const HandleEdit = (items) => {
    setChageRender(true)
    setItem(items)
  }

  const HandleDelete = (items) => {
    setConfirm(true)
    setItem(items)
  }

  const handleClose = async (value) => {
    setDadosUpload(null)
    setChageRender(value)
    setSuccess(value)
    setItem(null)
    // window.location.reload()
    setMessage('Salvo com sucesso!')
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0

  const action = (
    <Message color="success" severity="success">
      {message}
    </Message>
  )

  useEffect(() => {
    HandleEvents()
  }, [changeRender])

  useEffect(() => {
    console.log(events)
    // window.location.reload()
  }, [events])

  const Render = () => {
    // const dataInicio = {
    //   name: 'auth_data_created',
    //   label: 'Data Criação',
    //   value: filtros?.auth_data_created || '',
    //   format: 'YYYY-MM-DD HH:mm'
    // }
    // const dataFim = {
    //   name: 'auth_data_created',
    //   label: 'Data Fim',
    //   value: filtros?.auth_data_created || '',
    //   format: 'YYYY-MM-DD HH:mm'
    // }
    const Name = {
      name: 'auth_name',
      label: 'Nome',
      value: filtros?.auth_name || ''
    }
    return (
      events && (
        <Box sx={{ width: '100%' }}>
          <Card style={{ marginBottom: '15px' }}>
            <Typography variant="h4">Usuários</Typography>
            <CardContent>
              <div className="row">
                <div className="col-md-11">
                  <TextField
                    fullWidth
                    variant="filled"
                    label={Name.label}
                    value={Name.value}
                    onChange={(v) => onChange(Name.name, v.target.value)}
                  />
                </div>

                {/* <div className="col-md-3">
                  <TextField
                    fullWidth
                    variant="filled"
                    label={descricao.label}
                    value={descricao.value}
                    onChange={(v) => onChange(descricao.name, v.target.value)}
                  />
                </div>
                <div className="col-md-2 mt-2">
                  <DatePicker data={dataInicio} onChange={onChange} />
                </div>
                <div className="col-md-2 mt-2">
                  <DatePicker data={dataFim} onChange={onChange} />
                </div> */}
                {/* <div className="col-md-1 text-end"> */}
                <Fab
                  // className="ml-25 mt-2"
                  size="large"
                  style={{
                    backgroundColor: '#005128'
                    // bottom: '50px',
                    // left: '30px'
                  }}
                  onClick={() => HandleEvents()}>
                  <Icon
                    path={mdiMagnify}
                    title="Pesquisar"
                    size={1}
                    color="white"
                  />
                </Fab>
                <Fab
                  // className="ml-25 mt-2"
                  size="large"
                  style={{
                    backgroundColor: '#f5781e'
                    // bottom: '50px',
                    // left: '34px'
                  }}
                  onClick={() => HandleRender(true)}
                  // onClick={AceitarTermo}
                >
                  <Icon
                    path={mdiPlus}
                    title="Pesquisar"
                    size={1}
                    color="white"
                  />
                </Fab>
                {/* </div> */}
              </div>
            </CardContent>
          </Card>
          <Card style={{ marginBottom: '15px' }}>
            <CardContent>
              <Paper sx={{ width: '100%', mb: 2, height: '100%' }}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                  <Table aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={events.length}
                    />
                    <TableBody>
                      {/* if you don't need to support IE11, you
                       can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                      {events &&
                        stableSort(events, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`
                            let statusColor
                            let statusType
                            switch (row.auth_active) {
                              case 0:
                                statusColor = 'danger'
                                statusType = 'Inativo'
                                break
                              case 1:
                                statusColor = 'success'
                                statusType = 'Ativo'
                                break
                              default:
                                statusColor = 'danger'
                                statusType = 'inativo'
                                break
                            }
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.idauth}>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row">
                                  {row.auth_name}
                                </TableCell>
                                <TableCell align="center">
                                  {row.auth_login}
                                </TableCell>
                                <TableCell align="right">
                                  <h5>
                                    <Badge bg={statusColor}>{statusType}</Badge>
                                  </h5>
                                  {/* <Stack
                                spacing={4}
                                direction="row"
                                sx={{
                                  backgroundColor: '#006600'
                                }}>
                                {/* eslint-disable-next-line max-len */}

                                  {/* <Badge
                                className="MuiBadge-badge"
                                style={{
                                  backgroundColor: '#006600'
                                }}
                                badgeContent="gfhgfghhfhgh"
                                overlap="circle"
                                component="span"
                              /> */}
                                  {/* <span className={`badge badge-${statusColor}`}>
                                  {statusType}
                                </span> */}
                                  {/* </Stack>  */}
                                </TableCell>

                                <TableCell align="right">
                                  {dayjs(row?.auth_data_created)
                                    .tz('America/Sao_Paulo')
                                    .format('DD/MM/YYYY HH:mm')}
                                </TableCell>
                                <TableCell align="right">
                                  {dayjs(row?.auth_data_updated)
                                    .tz('America/Sao_Paulo')
                                    .format('DD/MM/YYYY HH:mm')}
                                </TableCell>
                                <TableCell align="right">
                                  <Fab
                                    // className="ml-25 mt-2"
                                    size="small"
                                    style={{
                                      backgroundColor: 'rgb(236 236 236)'
                                      // bottom: '50px',
                                      // left: '30px'
                                    }}
                                    onClick={() => HandleEdit(row)}>
                                    <Icon
                                      path={mdiBorderColor}
                                      style={{
                                        color: '#005128'
                                        // bottom: '50px'
                                        // left: '30px'
                                      }}
                                      title="Editar"
                                      size={1}
                                      // color="white"
                                    />
                                  </Fab>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                      {/* {renderItens()} */}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows
                          }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={events.length}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage="Registros por página"
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}>
            {action}
          </Snackbar>
          <Dialog
            className="justify-content-left"
            open={confirm}
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title">
            <DialogContent dividers>
              <Alert color="warning">
                <AlertTitle>
                  Tem certeza que deseja excluir este registro?
                </AlertTitle>
              </Alert>
            </DialogContent>
            <DialogActions>
              <div className="col-md-6 text-center w-50">
                <button
                  type="button"
                  className="btn btn-danger  btn-lg w-50"
                  onClick={() => {
                    setConfirm(false)
                  }}>
                  Cancelar
                </button>
              </div>
              <div className="col-md-6 text-center w-50">
                <button
                  type="button"
                  className="submit btn btn-success bg-verde-primario btn-lg w-50">
                  Confirmar
                </button>
              </div>
            </DialogActions>
          </Dialog>
        </Box>
      )
    )
  }

  return !changeRender ? (
    Render()
  ) : (
    <Form data={item} handleClose={handleClose} HandleRender={HandleRender} />
  )
}
