import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// components
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box
} from '@material-ui/core';
import { Visibility, VisibilityOff, Lock } from '@material-ui/icons';
import { useFormik, Form, FormikProvider } from 'formik';
// yup
import * as Yup from 'yup';

const ChangePasswordForm = ({
  buttonFullWidth = true,
  hasOldPasswordField = true,
  onSubmit
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const PasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Por favor digite su nueva contraseña')
      .min(8, 'Su nueva contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[0-9])/,
        'Su nueva contraseña debe tener al menos un dígito'
      )
      .matches(
        /^(?=.*[a-zA-Z])/,
        'Su nueva contraseña debe tener al menos una letra'
      ),
    passwordConfirm: Yup.string()
      .required('Por favor repita su nueva contraseña')
      .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
  });

  const PasswordSchemaHasOldPassword = Yup.object().shape({
    oldPassword: Yup.string().required('Por favor digite su contraseña actual'),
    ...PasswordSchema
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: ''
    },
    validationSchema: hasOldPasswordField
      ? PasswordSchemaHasOldPassword
      : PasswordSchema,
    onSubmit: (data) => onSubmit(data)
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {hasOldPasswordField ? (
          <TextField
            fullWidth
            name="oldPassword"
            label="Contraseña actual"
            sx={{ marginBottom: 2 }}
            placeholder="Digite su contraseña actual"
            type={showOldPassword ? 'text' : 'password'}
            {...getFieldProps('oldPassword')}
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
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
        ) : null}
        <TextField
          fullWidth
          name="newPassword"
          label="Nueva contraseña"
          placeholder="Digite su nueva contraseña"
          type={showNewPassword ? 'text' : 'password'}
          {...getFieldProps('newPassword')}
          error={Boolean(touched.newPassword && errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
        <TextField
          fullWidth
          name="passwordConfirm"
          label="Repetir contraseña"
          placeholder="Repita su nueva contraseña"
          type={showPasswordConfirm ? 'text' : 'password'}
          {...getFieldProps('passwordConfirm')}
          error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
          helperText={touched.passwordConfirm && errors.passwordConfirm}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  edge="end"
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
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
        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            fullWidth={buttonFullWidth}
            variant="contained"
            type="primary"
            size="large"
          >
            Enviar
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  );
};

ChangePasswordForm.propTypes = {
  buttonFullWidth: PropTypes.bool,
  hasOldPasswordField: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default ChangePasswordForm;
