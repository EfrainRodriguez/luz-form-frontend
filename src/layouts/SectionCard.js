import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

// ---------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 900,
  minHeight: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: theme.spacing(4, 4),
  margin: theme.spacing(0)
}));

// ---------------------------------------------------------

const SectionCard = ({ children }) => <CardStyle>{children}</CardStyle>;

SectionCard.propTypes = {
  children: PropTypes.node
};

export default SectionCard;
