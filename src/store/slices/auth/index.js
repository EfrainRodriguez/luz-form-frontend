// redux toolkit
import { createSlice } from '@reduxjs/toolkit';
// jwt decode
// import jwtDecode from 'jwt-decode';
// api
import { api } from '../../../utils/axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    remember: true,
    isLoading: false,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
  },
  reducers: {
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSession: (state, action) => {
      if (action.payload) {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } else {
        state.accessToken = null;
        state.refreshToken = null;
        delete api.defaults.headers.common['Authorization'];
      }
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutSucces: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const {
  setSession,
  setRemember,
  loginSuccess,
  logoutSucces,
  setIsLoading
} = authSlice.actions;

export default authSlice.reducer;

// -----------------------------------------------------------

export const login = (data) => (dispatch) => {
  const { documentNumber, email, password } = data;
  const user = {
    documentNumber,
    email,
    password,
    firstName: 'Efrain'
  };
  dispatch(setIsLoading(true));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        documentNumber === '70882148141' &&
        email === 'efrainrg92@gmail.com' &&
        password === 'abc123'
      ) {
        dispatch(setIsLoading(false));
        dispatch(loginSuccess(user));
        resolve();
      } else {
        dispatch(setIsLoading(false));
        reject();
      }
    }, 1000);
  });

  // dispatch(setIsLoading(true));

  // return new Promise((resolve, reject) => {
  //   api
  //     .post('/auth/login', data)
  //     .then((response) => {
  //       const { accessToken, refreshToken } = response.data;
  //       dispatch(loginSuccess(jwtDecode(response.data.accessToken).user));
  //       dispatch(setSession({ accessToken, refreshToken }));
  //       dispatch(setIsLoading(false));
  //       resolve(response);
  //     })
  //     .catch((error) => {
  //       dispatch(setIsLoading(false));
  //       reject(error);
  //     });
  // });
};

// -----------------------------------------------------------

export const logout = () => (dispatch) => {
  dispatch(logoutSucces());
  dispatch(setSession(null));
  return new Promise((resolve, reject) => {
    api
      .post('/auth/logout')
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

// -----------------------------------------------------------

export const fetchRefreshToken = () => (dispatch, getState) => {
  const {
    auth: { refreshToken }
  } = getState();

  dispatch(setIsLoading(true));

  if (refreshToken) {
    api
      .post('/auth/token', {
        refreshToken
      })
      .then((response) => {
        dispatch(
          setSession({
            refreshToken,
            accessToken: response.data.accessToken
          })
        );
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSession(null));
        dispatch(setIsLoading(false));
      });
  } else {
    dispatch(logoutSucces());
    dispatch(setSession(null));
  }
};

// ----------------------------------------------------

export const forgotPassword = (data) => (dispatch) => {
  const { email } = data;

  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    api
      .post('/auth/forgot-password', {
        email
      })
      .then((response) => {
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};

// ----------------------------------------------------

export const resetPassword = (data) => (dispatch) => {
  const { newPassword, passwordConfirm } = data;

  dispatch(setIsLoading(true));

  return new Promise((resolve, reject) => {
    api
      .post('/auth/reset-password', {
        newPassword,
        passwordConfirm
      })
      .then((response) => {
        dispatch(setIsLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        reject(error);
      });
  });
};
