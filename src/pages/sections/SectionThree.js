import React from 'react';
// router
import { useHistory } from 'react-router-dom';
// prop types
import PropTypes from 'prop-types';
// material
import {
  Card,
  Typography,
  Box,
  CardContent,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// input mask
import InputMask from 'react-input-mask';

const SectionThree = ({
  zipCode,
  address,
  number,
  neighborhood,
  complement,
  state,
  city
}) => {
  const fieldSchema = Yup.object().shape({
    zipCode: Yup.string().required('Por favor informe o CEP'),
    address: Yup.string().required('Por favor informe o endereço'),
    neighborhood: Yup.string().required('Por favor informe o bairro'),
    state: Yup.string().required('Por favor informe o estado'),
    city: Yup.string().required('Por favor informe a cidade')
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      zipCode: zipCode || '',
      address: address || '',
      neighborhood: neighborhood || '',
      state: state || '',
      city: city || '',
      number: number || '',
      complement: complement || ''
    },
    validationSchema: fieldSchema,
    onSubmit: (data) => console.log(data) // onSubmit(data)
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography mb={4} variant="h6">
                Informe o endereço onde ocorre o problema atualmente
              </Typography>
              <Grid mb={4} container spacing={2} alignItems="center">
                <Grid item xs={24} md={4}>
                  <InputMask mask="99.999-999">
                    {() => (
                      <TextField
                        fullWidth
                        name="zipCode"
                        label="CEP"
                        placeholder="Informe o CEP"
                        error={Boolean(touched.zipCode && errors.zipCode)}
                        helperText={touched.zipCode && errors.zipCode}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={24} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>

              <Grid mb={4} container spacing={2} alignItems="center">
                <Grid item xs={24} md={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Endereço"
                    placeholder="Informe o endereço"
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>

              <Grid mb={4} container spacing={2} alignItems="center">
                <Grid item xs={24} md={6}>
                  <TextField
                    fullWidth
                    name="number"
                    label="Número"
                    placeholder="Informe o número"
                    error={Boolean(touched.number && errors.number)}
                    helperText={touched.number && errors.number}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={24} md={6}>
                  <TextField
                    fullWidth
                    name="neighborhood"
                    label="Bairro"
                    placeholder="Informe o bairro"
                    error={Boolean(touched.neighborhood && errors.neighborhood)}
                    helperText={touched.neighborhood && errors.neighborhood}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>

              <Grid mb={4} container spacing={2} alignItems="center">
                <Grid item xs={24} md={12}>
                  <TextField
                    fullWidth
                    name="complement"
                    label="Complemento"
                    placeholder="Informe o complemento"
                    error={Boolean(touched.complement && errors.complement)}
                    helperText={touched.complement && errors.complement}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={24} md={6}>
                  <TextField
                    fullWidth
                    name="state"
                    label="Estado"
                    placeholder="Informe o estado"
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={24} md={6}>
                  <TextField
                    fullWidth
                    name="city"
                    label="Cidade"
                    placeholder="Informe a cidade"
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              size="large"
              onClick={() => history.push('/form/section-two')}
            >
              Voltar
            </Button>
            <Button variant="contained" type="primary" size="large">
              Enviar
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
};

SectionThree.propTypes = {
  zipCode: PropTypes.string,
  address: PropTypes.string,
  neighborhood: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  number: PropTypes.string,
  complement: PropTypes.string
};

export default SectionThree;
