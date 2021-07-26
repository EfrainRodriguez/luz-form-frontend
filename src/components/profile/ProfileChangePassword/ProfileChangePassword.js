import React from 'react';
// material
import { Card, CardContent, Typography } from '@material-ui/core';
// custom components
import { ChangePasswordForm } from '../../authentication/ChangePassword';

const ProfileChangePassword = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Para solicitar el cambio de contraseña ingrese su contraseña actual y
        luego defina una nueva.
      </Typography>
      <Typography sx={{ marginBottom: 4 }}>
        Recuerde que su nueva contraseña debe tener al menos 8 caracteres y debe
        incluir al menos un número.
      </Typography>
      <ChangePasswordForm buttonFullWidth={false} />
    </CardContent>
  </Card>
);

export default ProfileChangePassword;
