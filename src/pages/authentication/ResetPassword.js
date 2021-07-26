import React from 'react';
// router
import { useHistory } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Container, Typography, Box } from '@material-ui/core';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/slices/auth';
// components
import { ChangePasswordForm } from '../../components';
// pages
import LoadingPage from '../LoadingPage';
// path
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  margin: theme.spacing(0)
}));

// ----------------------------------------------------------------------

const ResetPassword = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const redirectToLogin = () => history.push(PATH_AUTH.login);

  const onSubmit = (data) => {
    dispatch(resetPassword(data))
      .then(() => {
        enqueueSnackbar('La contraseña ha sido restablecida con éxito!', {
          variant: 'success'
        });
        redirectToLogin();
      })
      .catch((error) => {
        enqueueSnackbar(
          error.response
            ? error.response.data.message
            : 'Error inesperado, por favor intente nuevamente',
          {
            variant: 'error'
          }
        );
      });
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <Container>
        <ContentStyle>
          <CardStyle>
            <Box mb={4}>
              <Typography align="center" variant="h4">
                Actualizar contraseña
              </Typography>
            </Box>
            <ChangePasswordForm
              hasOldPasswordField={false}
              onSubmit={onSubmit}
            />
          </CardStyle>
        </ContentStyle>
      </Container>
    </>
  );
};

export default ResetPassword;
