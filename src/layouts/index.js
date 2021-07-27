import React from 'react';
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

const PageLayout = () => (
  <Container>
    <ContentStyle>
      <PageHeader />
      <SectionCard />
    </ContentStyle>
  </Container>
);

export default PageLayout;
