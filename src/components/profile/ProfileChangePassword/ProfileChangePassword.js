import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { Card, CardContent, Typography } from '@material-ui/core';
// custom components
import { ChangePasswordForm } from '../../authentication/ChangePassword';

const ProfileChangePassword = ({ onSubmit }) => (
  <Card>
    <CardContent>
      <Typography sx={{ marginBottom: 4 }}>
        Sua nova senha deve ter ao menos 8 caracteres e deve incluir ao menos un
        número.
      </Typography>
      <ChangePasswordForm buttonFullWidth={false} onSubmit={onSubmit} />
    </CardContent>
  </Card>
);

ProfileChangePassword.propTypes = {
  onSubmit: PropTypes.func
};

export default ProfileChangePassword;
