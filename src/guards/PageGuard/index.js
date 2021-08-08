import React from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { Redirect } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';

const PageGuard = ({ children }) => {
  const { filledForm, step } = useSelector((state) => state.form);

  if (filledForm <= step) {
    return <Redirect to="/form/section-one" />;
  }

  return <>{children}</>;
};

PageGuard.propTypes = {
  children: PropTypes.node
};

export default PageGuard;
