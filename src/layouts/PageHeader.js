import React from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
// logo
import logo from '../assets/images/logo.PNG';

// -------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 900,
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: theme.spacing(4, 2),
  marginBottom: theme.spacing(4),
  borderRadius: '0px 0px 16px 16px'
}));

// -------------------------------------------------------

const PageHeader = () => (
  <CardStyle>
    <Box mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={logo} alt="logo" width="100" />
    </Box>
    <Typography mb={2} align="center" variant="h3">
      Apaixonados pelo problema
    </Typography>
    <Box
      sx={{
        width: '50%',
        height: '5px',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#FFC824'
      }}
      mb={2}
    />
    <Typography align="center" variant="body">
      Mapeando problemas para atrair soluções
    </Typography>
  </CardStyle>
);

export default PageHeader;
