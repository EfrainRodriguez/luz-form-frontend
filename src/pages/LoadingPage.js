import React from 'react';
// material
import { CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// custom styles ---------------------------------------------

const RootStyle = styled('div')(() => ({
  zIndex: 10,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
}));

// -----------------------------------------------------------

const LoadingPage = () => (
  <RootStyle>
    <CircularProgress />
  </RootStyle>
);

export default LoadingPage;
