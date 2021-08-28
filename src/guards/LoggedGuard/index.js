import React from 'react';
// prop-type
import PropTypes from 'prop-types';
// router
import { Redirect } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// paths
import { PATH_FORM } from '../../routes/paths';

const LoggedGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to={PATH_FORM.list} />;
  }

  return <>{children}</>;
};

LoggedGuard.propTypes = {
  children: PropTypes.node
};

export default LoggedGuard;
