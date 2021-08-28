import { createSlice } from '@reduxjs/toolkit';
// axios
import { api, viacep } from '../../../utils/axios';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {},
    formList: [],
    step: 0,
    filledForm: 1,
    isLoading: false
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    changeFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setFilledForm: (state, action) => {
      state.filledForm = action.payload;
    },
    setFormList: (state, action) => {
      state.formList = action.payload;
    }
  }
});

export const {
  setFormData,
  changeFormData,
  setLoading,
  setStep,
  setFilledForm,
  setFormList
} = formSlice.actions;

export default formSlice.reducer;

export const searchAddressByZipcode = (zipCode) => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    viacep
      .get(`/ws/${zipCode}/json/`)
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(
          changeFormData({
            zipCode: response.data.cep,
            address: response.data.logradouro,
            number: response.data.numero,
            neighborhood: response.data.bairro,
            complement: response.data.complemento,
            state: response.data.uf,
            city: response.data.localidade
          })
        );
        resolve(response);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        reject(error);
      });
  });
};

export const fetchFormList = () => (dispatch) => {
  dispatch(setLoading(true));
  return new Promise((resolve, reject) => {
    api
      .get(`/form/problem`)
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setFormList(response.data.data));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        reject(error);
      });
  });
};

export const sendFormData = () => (dispatch, getState) => {
  const {
    form: { formData }
  } = getState();

  dispatch(setLoading(true));

  return new Promise((resolve, reject) => {
    api
      .post(`/form/problem`, formData)
      .then((response) => {
        dispatch(setLoading(false));
        resolve(response);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        reject(error);
      });
  });
};
