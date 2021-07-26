const path = (root, subpath) => `${root}${subpath}`;

const ROOT_AUTH = '/auth';
const ROOT_HOME = '/home';
const ROOT_PROFILE = '/profile';
const ROOT_PRODUCTS = '/products';

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login'),
  forgotPassword: path(ROOT_AUTH, '/forgot-password'),
  changePassword: path(ROOT_AUTH, '/reset-password/:token')
};

export const PATH_HOME = {
  root: ROOT_HOME
};

export const PATH_PROFILE = {
  root: ROOT_PROFILE
};

export const PATH_PRODUCTS = {
  root: ROOT_PRODUCTS,
  list: path(ROOT_PRODUCTS, '/list')
};
