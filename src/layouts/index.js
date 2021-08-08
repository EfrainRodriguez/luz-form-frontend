import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Container, Stepper, Step, StepLabel } from '@material-ui/core';
// redux
import { useSelector } from 'react-redux';
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

const steps = ['Dados gerais', 'Preferências de contato', 'Endereço'];

const PageLayout = ({ children }) => {
  const { step } = useSelector((state) => state.form);
  return (
    <Container>
      <ContentStyle>
        <PageHeader />
        {!step === 3 && (
          <Stepper activeStep={step} sx={{ marginBottom: '32px' }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        <SectionCard>{children}</SectionCard>
        {!step === 3 && (
          <Stepper activeStep={step} sx={{ marginBottom: '32px' }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </ContentStyle>
    </Container>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node
};

export default PageLayout;
