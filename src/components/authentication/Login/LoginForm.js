import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// router
// import { Link as RouterLInk } from 'react-router-dom';
// material
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Box
  // Link
} from '@material-ui/core';
import { Visibility, VisibilityOff, Person, Lock } from '@material-ui/icons';
// input mask
import InputMask from 'react-input-mask';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';
// paths
// import { PATH_AUTH } from '../../../routes/paths';

const LoginForm = ({ email, remember, documentNumber, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor informe um e-mail válido')
      .required('Por favor informe seu e-mail'),
    password: Yup.string().required('Por favor informe sua senha'),
    documentNumber: Yup.string().required('Por favor informe seu CPF')
  });

  const formik = useFormik({
    initialValues: {
      email: email || '',
      remember,
      password: '',
      documentNumber: documentNumber || ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data, formikHelpers) => {
      const { documentNumber } = data;
      const cleanDocumentNumber = documentNumber.replace(/[^\d]+/g, '');
      if (cleanDocumentNumber.length < 11) {
        return formikHelpers.setErrors({
          documentNumber: 'Por favor informe um CPF válido'
        });
      }
      return onSubmit(
        {
          ...data,
          documentNumber: cleanDocumentNumber
        },
        formikHelpers
      );
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <InputMask mask="999.999.999-99" {...getFieldProps('documentNumber')}>
          {() => (
            <TextField
              fullWidth
              label="CPF"
              name="documentNumber"
              placeholder="Informe seu CPF"
              sx={{ marginBottom: 4 }}
              error={Boolean(touched.documentNumber && errors.documentNumber)}
              helperText={touched.documentNumber && errors.documentNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
              }}
            />
          )}
        </InputMask>
        <TextField
          fullWidth
          name="email"
          type="email"
          label="E-mail"
          placeholder="Informe seu e-mail"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          sx={{ marginBottom: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          name="password"
          label="Senha"
          placeholder="Informe sua senha"
          type={showPassword ? 'text' : 'password'}
          {...getFieldProps('password')}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Lembrar meus dados"
          />
          {/* <Link to={PATH_AUTH.forgotPassword} component={RouterLInk}>
            Olvidé mi contraseña
          </Link> */}
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="primary"
          size="large"
          sx={{ marginTop: 4 }}
        >
          Entrar
        </Button>
      </Form>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string,
  remember: PropTypes.bool,
  password: PropTypes.string,
  documentNumber: PropTypes.string,
  onSubmit: PropTypes.func
};

export default LoginForm;
