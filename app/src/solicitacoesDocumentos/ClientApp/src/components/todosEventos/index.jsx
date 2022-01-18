/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
import React, { useRef, useEffect, useState } from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Fab,
  Card,
  Divider,
  Paper,
  CardContent,
} from '@material-ui/core';

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
import APIEventos from '../../lib/api/eventos';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/colors.css';
import './index.css';
// eslint-disable-next-line import/no-unresolved
import endpoint from '../../endpoints.config';

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

const AllEvents = (props) => {
  const classes = useStyles();
  const customerLogo = useRef(null);
  const [events, setEvents] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

  const HandleEvents = async () => {
    dayjs.extend(timezone);
    const campos = {};

    campos.rg_date_begin_show = dayjs().startOf('month');
    campos.rg_date_end_visu = dayjs().endOf('month');
    const resp = await APIEventos.getEvents(campos);
    if (resp?.success) {
      console.log(resp);
      setEvents(resp.data);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    HandleEvents();
  }, []);
  // const Events =
  // <TableContainer>
  //                 <Table
  //                   sx={{ minWidth: 750 }}
  //                   aria-labelledby="tableTitle"
  //                   size="medium">
  //                   <EnhancedTableHead
  //                     numSelected={selected.length}
  //                     order={order}
  //                     orderBy={orderBy}
  //                     onSelectAllClick={handleSelectAllClick}
  //                     onRequestSort={handleRequestSort}
  //                     rowCount={events.length}
  //                   />
  //                   <TableBody>
  //                     {/* if you don't need to support IE11, you
  //                      can replace the `stableSort` call with:
  //                  rows.slice().sort(getComparator(order, orderBy)) */}
  //                     {events &&
  //                       stableSort(events, getComparator(order, orderBy))
  //                         .slice(
  //                           page * rowsPerPage,
  //                           page * rowsPerPage + rowsPerPage
  //                         )
  //                         .map((row, index) => {

  //                          return   <div>
  //     <div className="col-md-12">
  //       <Box
  //         p={2}
  //         style={{
  //           backgroundColor: '#7fffd43b',
  //           width: '100%'
  //         }}>
  //         <Paper elevation={5} style={{ height: '100%' }}>
  //           <Card
  //             key={item.title}
  //             style={{
  //               width: '100%',
  //               backgroundColor: 'rgb(13, 74, 40)',
  //               padding: '1%'
  //             }}>
  //             <div className="row">
  //               <div className="col-md-2">
  //                 <img
  //                   alt={item.rg_title}
  //                   src={`${endpoint.UserBaseUrl}/events/image/${item?.rg_document}`}
  //                   ref={customerLogo}
  //                   height="200px"
  //                   width="200px"
  //                 />
  //                 <div
  //                   className="row"
  //                   style={{
  //                     marginTop: '7%',
  //                     bottom: '12%'
  //                   }}>
  //                   <div className="col-md-1 cor-laranja">
  //                     <MailIcon />
  //                   </div>
  //                   <div className="col-md-11 text-left">
  //                     <Typography variant="body2" style={{ color: 'white' }}>
  //                       {`• ${dayjs(item.rg_date_begin).format(
  //                         'DD/MM/YYYY HH:mm'
  //                       )}`}
  //                     </Typography>
  //                   </div>
  //                   <div className="col-md-1 cor-laranja">
  //                     <LocationOnIcon />
  //                   </div>
  //                   <div className="col-md-10 text-left">
  //                     <Typography variant="body2" style={{ color: 'white' }}>
  //                       {`• ${item.rg_local}`}
  //                     </Typography>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-md-9 b">
  //                 <Typography
  //                   style={{
  //                     fontWeight: 600,
  //                     color: 'white'
  //                   }}
  //                   gutterBottom
  //                   variant="h3">
  //                   {item.rg_title}
  //                 </Typography>
  //                 <Typography
  //                   display="block"
  //                   variant="body2"
  //                   color="secondary"
  //                   style={{ width: '100%', color: 'white' }}>
  //                   {item.rg_description}
  //                 </Typography>
  //               </div>

  //               <div className="col-md-12 text-end">
  //                 <Fab
  //                   variant="extended"
  //                   size="small"
  //                   style={{
  //                     backgroundColor: '#b9d300'
  //                   }}
  //                   onClick={() => props.HandleShow('saibamais', item)}>
  //                   <Typography style={{ fontSize: '10px' }}>
  //                     saiba mais
  //                   </Typography>
  //                   <ChevronRightIcon className={classes.listItem} />
  //                 </Fab>
  //               </div>
  //             </div>
  //           </Card>
  //         </Paper>
  //       </Box>
  //     </div>
  //   </div>

  //                     {emptyRows > 0 && (
  //                       <TableRow
  //                         style={{
  //                           height: 53 * emptyRows
  //                         }}>
  //                         <TableCell colSpan={6} />
  //                       </TableRow>
  //                     )}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //               <TablePagination
  //                 rowsPerPageOptions={[5, 10, 25]}
  //                 component="div"
  //                 count={events.length}
  //                 rowsPerPage={rowsPerPage}
  //                 page={page}
  //                 onPageChange={handleChangePage}
  //                 onRowsPerPageChange={handleChangeRowsPerPage}
  //               />

  //             events.map((item) => (
  // <div>
  //   <div className="col-md-12">
  //     <Box
  //       p={2}
  //       style={{
  //         backgroundColor: '#7fffd43b',
  //         width: '100%'
  //       }}>
  //       <Paper elevation={5} style={{ height: '100%' }}>
  //         <Card
  //           key={item.title}
  //           style={{
  //             width: '100%',
  //             backgroundColor: 'rgb(13, 74, 40)',
  //             padding: '1%'
  //           }}>
  //           <div className="row">
  //             <div className="col-md-2">
  //               <img
  //                 alt={item.rg_title}
  //                 src={`${endpoint.UserBaseUrl}/events/image/${item?.rg_document}`}
  //                 ref={customerLogo}
  //                 height="200px"
  //                 width="200px"
  //               />
  //               <div
  //                 className="row"
  //                 style={{
  //                   marginTop: '7%',
  //                   bottom: '12%'
  //                 }}>
  //                 <div className="col-md-1 cor-laranja">
  //                   <MailIcon />
  //                 </div>
  //                 <div className="col-md-11 text-left">
  //                   <Typography variant="body2" style={{ color: 'white' }}>
  //                     {`• ${dayjs(item.rg_date_begin).format(
  //                       'DD/MM/YYYY HH:mm'
  //                     )}`}
  //                   </Typography>
  //                 </div>
  //                 <div className="col-md-1 cor-laranja">
  //                   <LocationOnIcon />
  //                 </div>
  //                 <div className="col-md-10 text-left">
  //                   <Typography variant="body2" style={{ color: 'white' }}>
  //                     {`• ${item.rg_local}`}
  //                   </Typography>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="col-md-9 b">
  //               <Typography
  //                 style={{
  //                   fontWeight: 600,
  //                   color: 'white'
  //                 }}
  //                 gutterBottom
  //                 variant="h3">
  //                 {item.rg_title}
  //               </Typography>
  //               <Typography
  //                 display="block"
  //                 variant="body2"
  //                 color="secondary"
  //                 style={{ width: '100%', color: 'white' }}>
  //                 {item.rg_description}
  //               </Typography>
  //             </div>

  //             <div className="col-md-12 text-end">
  //               <Fab
  //                 variant="extended"
  //                 size="small"
  //                 style={{
  //                   backgroundColor: '#b9d300'
  //                 }}
  //                 onClick={() => props.HandleShow('saibamais', item)}>
  //                 <Typography style={{ fontSize: '10px' }}>
  //                   saiba mais
  //                 </Typography>
  //                 <ChevronRightIcon className={classes.listItem} />
  //               </Fab>
  //             </div>
  //           </div>
  //         </Card>
  //       </Paper>
  //     </Box>
  //   </div>
  // </div>
  // ))

  return (
    <div className={classes.root}>
      <Box>
        <div className="col-md-12">
          <Divider style={{ backgroundColor: 'black', marginBottom: '5px' }} />
        </div>
        <div className="row">
          <div className="col-md-12">
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="medium">
                <TableBody>
                  {/* if you don't need to support IE11, you
                        can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                  {events &&
                    stableSort(events, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => {
                        return (
                          <Box
                            p={2}
                            style={{
                              backgroundColor: '#7fffd43b',
                              width: '100%',
                            }}>
                            <Paper elevation={5} style={{ height: '100%' }}>
                              <Card
                                key={row.title}
                                style={{
                                  width: '100%',
                                  backgroundColor: 'rgb(13, 74, 40)',
                                  padding: '2.5px',
                                }}>
                                <div className="row">
                                  <div className="col-md-2 text-left">
                                    <img
                                      alt={row.rg_title}
                                      // eslint-disable-next-line max-len
                                      src={`${endpoint.UserBaseUrl}/wwwroot/Docs/${row?.rg_document}`}
                                      ref={customerLogo}
                                      height="180px"
                                      width="180px"
                                      className="position-relative"
                                    />
                                    {/* <div
                                        className="row"
                                        style={{
                                          marginTop: '7%',
                                          bottom: '12%'
                                        }}>
                                        <div className="col-md-1 cor-laranja">
                                          <MailIcon />
                                        </div>
                                        <div className="col-md-11 text-left">
                                          <Typography
                                            variant="body2"
                                            style={{ color: 'white' }}>
                                            {`• ${dayjs(
                                              row.rg_date_begin
                                            ).format('DD/MM/YYYY HH:mm')}`}
                                          </Typography>
                                        </div>
                                        <div className="col-md-1 cor-laranja">
                                          <LocationOnIcon />
                                        </div>
                                        <div className="col-md-10 text-left">
                                          <Typography
                                            variant="body2"
                                            style={{ color: 'white' }}>
                                            {`• ${row.rg_local}`}
                                          </Typography>
                                        </div>
                                      </div> */}
                                  </div>
                                  <div className="col-md-8 b text-left">
                                    <Typography
                                      style={{
                                        fontWeight: 600,
                                        color: 'white',
                                      }}
                                      gutterBottom
                                      variant="h4">
                                      {row.rg_title}
                                    </Typography>
                                    <Typography
                                      display="block"
                                      variant="body2"
                                      color="secondary"
                                      style={{
                                        width: '100%',
                                        color: 'white',
                                        textAlign: 'justify',
                                        padding: '2%',

                                        wordWrap: 'break-word',
                                      }}>
                                      {row.rg_description.substr(0, 400)} ...
                                    </Typography>
                                  </div>
                                  <div
                                    className="col-md-2"
                                    style={{
                                      marginTop: '1%',
                                      bottom: '10%',
                                    }}>
                                    {/* <div className="col-md-1 cor-laranja">
                                      </div> */}
                                    <div className="col-md-11">
                                      <Typography
                                        variant="body2"
                                        style={{ color: 'white' }}>
                                        <MailIcon className="cor-laranja" />
                                        {` ${dayjs(row.rg_date_begin).format(
                                          'DD/MM/YYYY HH:mm',
                                        )}`}
                                      </Typography>
                                    </div>
                                    {/* <div className="col-md-1 cor-laranja">
                                        <LocationOnIcon />
                                      </div> */}
                                    <div className="col-md-10">
                                      <Typography
                                        variant="body2"
                                        style={{ color: 'white' }}>
                                        <LocationOnIcon className="cor-laranja" />
                                        {` ${row.rg_local}`}
                                      </Typography>
                                    </div>
                                  </div>

                                  <div className="col-md-12 text-end">
                                    <Fab
                                      variant="extended"
                                      size="small"
                                      style={{
                                        backgroundColor: '#b9d300',
                                      }}
                                      onClick={() =>
                                        props.HandleShow('saibamais', row)
                                      }>
                                      <Typography style={{ fontSize: '10px' }}>
                                        saiba mais
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
                        );
                      })}

                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
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
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        <div className="col-md-12">
          <Divider style={{ backgroundColor: 'black', marginTop: '25px' }} />
        </div>
      </Box>
    </div>
  );
};

export default AllEvents;
