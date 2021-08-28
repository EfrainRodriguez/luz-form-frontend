import React from 'react';
// prop-types
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import { FilterList, Search } from '@material-ui/icons';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  actions: PropTypes.node,
  onFilterName: PropTypes.func
};

export default function ListToolbar({
  numSelected,
  filterName,
  searchPlaceholder,
  actions,
  onFilterName
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography flex={1} component="div" variant="subtitle1">
          {numSelected} {numSelected > 1 ? 'seleccionados' : 'seleccionado'}
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={searchPlaceholder}
          startAdornment={
            <InputAdornment position="start">
              <Search sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <>{actions}</>
      ) : (
        <Tooltip title="Filtro de lista">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
