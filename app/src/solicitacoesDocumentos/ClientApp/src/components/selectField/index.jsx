/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { mdiFormatListBulleted } from '@mdi/js';
// import { IconButton } from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
// import SearchField from '../searchField'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectField(props) {
  const state = props;
  let propsvalue =
    state?.data.value && typeof state?.data.value === 'object'
      ? state?.data.value
      : (state?.data.value || '').toString();

  !propsvalue && state.data.multiple && (propsvalue = []);

  const classes = useStyles();
  const [value, setValue] = useState(propsvalue);
  const [show, setShow] = React.useState(false);

  const handleChange = (event) => {
    state.onChange(state.data.name, event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => setValue(state.data.value), [state.data.value]);

  const select = state.data;
  const menusElm = [];
  const config = select.config || { text: 'name', value: 'id' };

  if (select.items) {
    select.items.map((item) => {
      item[config.value] = item[config.value].toString();
      return menusElm.push(
        <MenuItem key={item[config.value]} value={item[config.value]}>
          {item[config.text]}
        </MenuItem>,
      );
    });
  }

  !value && state.data.multiple && setValue([]);

  return (
    <FormControl className={classes.formControl} disabled={state.disabled}>
      <InputLabel id={`select-label-${select.name}`}>{select.label}</InputLabel>
      <Select
        labelId={`select-label-${select.name}`}
        id={`select-${select.name}`}
        multiple={select.multiple || false}
        required={select.required || false}
        value={value}
        disabled={state.disabled}
        onChange={handleChange}
        fullWidth>
        {menusElm}
      </Select>
    </FormControl>
  );
}
