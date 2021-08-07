import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Radio,
  Typography,
  RadioGroup,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';

const RadioGroupForm = ({
  row,
  name,
  label,
  values,
  errors,
  options,
  touched,
  fieldProps,
  labelPlacement,
  onChange
}) => (
  <>
    <Typography variant="h6">{label}</Typography>
    <RadioGroup row={row} name={name} value={values[name]} {...fieldProps}>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option.value}
          label={option.label}
          labelPlacement={labelPlacement}
          control={<Radio onChange={onChange} />}
        />
      ))}
    </RadioGroup>
    {touched[name] && errors[name] && (
      <FormHelperText>{errors[name]}</FormHelperText>
    )}
  </>
);

RadioGroupForm.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  fieldProps: PropTypes.object,
  labelPlacement: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioGroupForm;
