import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Grid, Typography, FormControl } from '@material-ui/core';
// components
import RadioGroupForm from './RadioGroupForm';

const InterestQuestion = ({
  name,
  label,
  values,
  errors,
  touched,
  options,
  getFieldProps
}) => (
  <>
    <Typography mb={2} variant="h6">
      {label}
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3} display="flex" alignItems="flex-end">
        <Typography mb={2} align="center" variant="caption">
          Nenhum pouco interessad@
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} display="flex" justifyContent="center">
        <FormControl error={Boolean(touched[name] && errors[name])}>
          <RadioGroupForm
            row
            name={name}
            values={values}
            touched={touched}
            errors={errors}
            options={options}
            labelPlacement="top"
            fieldProps={getFieldProps(name)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3} display="flex" alignItems="flex-end">
        <Typography mb={2} variant="caption">
          Totalmente interessad@
        </Typography>
      </Grid>
    </Grid>
  </>
);

InterestQuestion.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  getFieldProps: PropTypes.object
};

export default InterestQuestion;
