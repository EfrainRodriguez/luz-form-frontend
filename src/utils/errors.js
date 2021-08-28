export const getErrorObject = (errorList = []) => {
  let errorObject;
  errorList.map((error) => {
    errorObject = {
      ...errorObject,
      [error.name]: error.message
    };
    return error;
  });
  return errorObject;
};
