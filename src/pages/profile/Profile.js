import React, { useState } from 'react';
// material
import { Container, Tabs, Tab, Box } from '@material-ui/core';
import { AccountBox, VpnKey } from '@material-ui/icons';
// notistack
// import { useSnackbar } from 'notistack';
// redux
// import { useDispatch } from 'react-redux';
// import { updatePassword, logout } from '../../store/slices/auth';
// custom components
import { Page, ProfileGeneral, ProfileChangePassword } from '../../components';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('general');

  // const dispatch = useDispatch();

  // const { enqueueSnackbar } = useSnackbar();

  const handleChangePassword = () => {
    // dispatch(updatePassword(data))
    //   .then(() => {
    //     enqueueSnackbar(
    //       'Hemos actualizado su contraseña! Por favor, accese nuevamente',
    //       {
    //         variant: 'success'
    //       }
    //     );
    //     dispatch(logout());
    //   })
    //   .catch((error) => {
    //     enqueueSnackbar(
    //       error.response
    //         ? error.response.data.message
    //         : 'Error inesperado, por favor intente nuevamente',
    //       {
    //         variant: 'error'
    //       }
    //     );
    //   });
  };

  const getTabContent = (tab) => {
    if (tab === 'general') return <ProfileGeneral />;
    if (tab === 'password')
      return <ProfileChangePassword onSubmit={handleChangePassword} />;
    return null;
  };

  return (
    <Page title="Meu perfil">
      <Container>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(event, tab) => setCurrentTab(tab)}
        >
          <Tab
            disableRipple
            value="general"
            label="Dados gerais"
            icon={<AccountBox fontSize="small" />}
          />
          <Tab
            disableRipple
            value="password"
            label="Alterar senha"
            icon={<VpnKey fontSize="small" />}
          />
        </Tabs>

        <Box sx={{ mt: 5 }}>{getTabContent(currentTab)}</Box>
      </Container>
    </Page>
  );
};

export default Profile;
