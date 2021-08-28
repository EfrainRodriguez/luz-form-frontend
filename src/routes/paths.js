const path = (root, subpath) => `${root}${subpath}`;

const ROOT_FORM = '/form';
const ROOT_AUTH = '/auth';
const ROOT_PROFILE = '/profile';

export const PATH_FORM = {
  root: ROOT_FORM,
  sectionOne: path(ROOT_FORM, '/section-one'),
  sectionTwo: path(ROOT_FORM, '/section-two'),
  sectionThree: path(ROOT_FORM, '/section-three'),
  final: path(ROOT_FORM, '/final'),
  // private
  list: path(ROOT_FORM, '/list'),
  userSectionOne: path(ROOT_FORM, '/user/section-one'),
  userSectionTwo: path(ROOT_FORM, '/user/section-two'),
  userSectionThree: path(ROOT_FORM, '/user/section-three'),
  userFinal: path(ROOT_FORM, '/user/final')
};

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login')
};

export const PATH_PROFILE = {
  root: ROOT_PROFILE
};
