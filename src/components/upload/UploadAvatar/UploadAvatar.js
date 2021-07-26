import React from 'react';
// prop types
import PropTypes from 'prop-types';
// dropzone
import { useDropzone } from 'react-dropzone';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    opacity: 0.72
  }
}));

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
  disabled: PropTypes.bool,
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default function UploadAvatar({
  disabled,
  error = false,
  value: file,
  ...other
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      disabled
    });

  return (
    <>
      <RootStyle {...other}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            })
          }}
        >
          <input {...getInputProps()} />

          {file && (
            <Box
              component="img"
              alt="avatar"
              src={file}
              sx={{ zIndex: 8, objectFit: 'cover' }}
            />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 }
              })
            }}
          >
            <Box sx={{ width: 24, height: 24, mb: 1 }}>
              <AddAPhoto />
            </Box>
            <Typography variant="caption">
              {file ? 'Cambiar foto' : 'Subir foto'}
            </Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>
    </>
  );
}
