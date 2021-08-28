import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Box, Typography, Container } from '@material-ui/core';

const Page = ({ children, title, titleProps, restProps }) => (
  <Box {...restProps}>
    <Container sx={{ marginBottom: '32px' }}>
      <Typography textAlign="center" variant="h4" {...titleProps}>
        {title}
      </Typography>
    </Container>
    {children}
  </Box>
);

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  titleProps: PropTypes.object,
  restProps: PropTypes.object
};

export default Page;
