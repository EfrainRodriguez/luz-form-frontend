import React, { useState } from 'react';
// material
import { Container, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { AccountBox, VpnKey, Settings } from '@material-ui/icons';
// custom components
import { Page, ProfileGeneral, ProfileChangePassword } from '../../components';

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('general');

  const getTabContent = (tab) => {
    if (tab === 'general') return <ProfileGeneral />;
    if (tab === 'password') return <ProfileChangePassword />;
    return null;
  };

  return (
    <Page>
      <Container>
        <Typography variant="h4" gutterBottom>
          Mi perfil
        </Typography>
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
            label="Datos generales"
            icon={<AccountBox fontSize="small" />}
          />
          <Tab
            disableRipple
            value="settings"
            label="Configuraciones"
            icon={<Settings fontSize="small" />}
          />
          <Tab
            disableRipple
            value="password"
            label="Cambiar contraseña"
            icon={<VpnKey fontSize="small" />}
          />
        </Tabs>

        <Box sx={{ mt: 5 }}>{getTabContent(currentTab)}</Box>
      </Container>
    </Page>
  );
};

export default Profile;
