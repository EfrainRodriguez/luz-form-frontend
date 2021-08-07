import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
// layout
import PageHeader from './PageHeader';
import SectionCard from './SectionCard';

// ---------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'start',
  padding: theme.spacing(0, 0, 12)
}));

// ---------------------------------------------------------

const PageLayout = ({ children }) => (
  <Container>
    <ContentStyle>
      <PageHeader />
      <SectionCard>{children}</SectionCard>
    </ContentStyle>
  </Container>
);

PageLayout.propTypes = {
  children: PropTypes.node
};

export default PageLayout;
