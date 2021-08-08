import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core';
// hooks
import { useWindowDimensions } from '../hooks';

const InterestQuestion = ({
  name,
  label,
  values,
  errors,
  touched,
  options,
  getFieldProps
}) => {
  const { width } = useWindowDimensions();

  const getLabel = (index, label) => {
    if (width <= 960) {
      if (index === 0) {
        return (
          <>
            {label}&nbsp;
            <Typography mb={2} align="center" variant="caption">
              - Nenhum pouco interessad@
            </Typography>
          </>
        );
      }

      if (index === 4) {
        return (
          <>
            {label}&nbsp;
            <Typography mb={2} align="center" variant="caption">
              - Totalmente interessad@
            </Typography>
          </>
        );
      }
    }
    return label;
  };

  return (
    <>
      <Typography mb={2} variant="h6">
        {label}
      </Typography>
      <Grid container spacing={3}>
        {!(width <= 960) && (
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            display="flex"
            alignItems="flex-end"
          >
            <Typography mb={2} align="center" variant="caption">
              Nenhum pouco interessad@
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display="flex"
          justifyContent="center"
        >
          <FormControl error={Boolean(touched[name] && errors[name])}>
            <RadioGroup
              row={!(width <= 960)}
              name={name}
              value={values[name]}
              {...getFieldProps(name)}
            >
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  label={getLabel(index, option.label)}
                  labelPlacement={width <= 960 ? 'end' : 'top'}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
            {touched[name] && errors[name] && (
              <FormHelperText>{errors[name]}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {!(width <= 960) && (
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            display="flex"
            alignItems="flex-end"
          >
            <Typography mb={2} variant="caption">
              Totalmente interessad@
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

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
