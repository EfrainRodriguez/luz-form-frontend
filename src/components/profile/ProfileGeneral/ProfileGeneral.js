import React from 'react';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent
} from '@material-ui/core';
// input mask
import InputMask from 'react-input-mask';

// ----------------------------------------------------------------------

export default () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      documentNumber: '',
      mobileNumber: '',
      address: '',
      state: '',
      city: ''
    },
    onSubmit: () => {}
  });

  const { handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Nome"
                      placeholder="Informe seu nome"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('name')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled
                      name="email"
                      label="E-mail"
                      {...getFieldProps('email')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask="999.999.999-99"
                      {...getFieldProps('documentNumber')}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          label="CPF"
                          name="documentNumber"
                          placeholder="Informe seu CPF"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      )}
                    </InputMask>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="mobileNumber"
                      label="Celular"
                      placeholder="Informe seu celular"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('mobileNumber')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Endereço"
                      placeholder="Informe seu endereço"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('address')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="state"
                      label="Estado"
                      placeholder="Informe o estado"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('state')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="city"
                      label="Cidade"
                      placeholder="Informe a cidade"
                      InputLabelProps={{
                        shrink: true
                      }}
                      {...getFieldProps('city')}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button type="submit" variant="contained" size="large">
                    Salvar dados
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};
