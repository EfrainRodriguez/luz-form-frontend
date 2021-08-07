import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Select,
  MenuItem,
  Typography,
  FormHelperText
} from '@material-ui/core';

const SelectForm = ({
  name,
  label,
  values,
  errors,
  options,
  touched,
  fieldProps
}) => (
  <>
    <Typography variant="h6">{label}</Typography>
    <Select name={name} value={values[name]} {...fieldProps}>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {touched[name] && errors[name] && (
      <FormHelperText>{errors[name]}</FormHelperText>
    )}
  </>
);

SelectForm.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  fieldProps: PropTypes.object
};

export default SelectForm;
