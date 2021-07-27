const path = (root, subpath) => `${root}${subpath}`;

const ROOT_FORM = '/form';

export const PATH_FORM = {
  root: ROOT_FORM,
  sectionOne: path(ROOT_FORM, '/section-one'),
  sectionTwo: path(ROOT_FORM, '/section-two'),
  sectionThree: path(ROOT_FORM, '/section-three')
};
