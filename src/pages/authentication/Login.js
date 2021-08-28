import React from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Container, Typography, Box } from '@material-ui/core';
// notistack
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { login, setRemember } from '../../store/slices/auth';
// components
import { LoginForm } from '../../components';
// pages
import LoadingPage from '../LoadingPage';
// util
import { getErrorObject } from '../../utils/errors';

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

export default () => {
  const { user, remember, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data, { setErrors }) => {
    const { email, password, remember, documentNumber } = data;
    dispatch(setRemember(remember));
    dispatch(
      login({
        email,
        password,
        documentNumber
      })
    )
      .then(() => {
        enqueueSnackbar('Que bom ter você de volta!', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar(
          'Por favor verifique sus credenciais e tente novamente',
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
                Acessar
              </Typography>
            </Box>
            <LoginForm
              {...(remember && { ...user })}
              remember={remember}
              onSubmit={onSubmit}
            />
          </CardStyle>
        </ContentStyle>
      </Container>
    </>
  );
};
