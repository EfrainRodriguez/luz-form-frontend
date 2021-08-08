import React from 'react';
// router
import { useHistory } from 'react-router-dom';
// material
import { Typography, Button, Box } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

const FinalPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/form/section-one');
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <CheckCircleOutline
          style={{ color: 'green', width: '100px', height: '100px' }}
        />
      </Box>
      <Typography mb={4} align="center" variant="h6">
        Formulário enviado com sucesso!
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          type="primary"
          size="large"
          onClick={handleRedirect}
        >
          Novo formulário
        </Button>
      </Box>
    </>
  );
};

export default FinalPage;
