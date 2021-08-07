import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Checkbox,
  FormGroup,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';

const CheckboxGroupForm = ({
  label,
  values,
  errors,
  options,
  touched,
  children,
  onChange
}) => {
  const isChecked = (value) => values.find((item) => item === value);

  return (
    <>
      <Typography variant="h6">{label}</Typography>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            label={option.label}
            control={
              <Checkbox
                name={option.value}
                checked={Boolean(isChecked(option.value))}
                onChange={onChange}
              />
            }
          />
        ))}
        {children}
      </FormGroup>
      {touched && errors && <FormHelperText>{errors}</FormHelperText>}
    </>
  );
};

CheckboxGroupForm.propTypes = {
  label: PropTypes.string,
  values: PropTypes.array,
  errors: PropTypes.string,
  options: PropTypes.array,
  touched: PropTypes.array,
  children: PropTypes.node,
  onChange: PropTypes.func
};

export default CheckboxGroupForm;
