import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

const Page = ({ children, restProps }) => <Box {...restProps}>{children}</Box>;

Page.propTypes = {
  children: PropTypes.node,
  restProps: PropTypes.object
};

export default Page;
