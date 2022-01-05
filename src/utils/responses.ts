const returnError = (data: any) => ({
  ...data,
  success: false,
});

const returnSuccess = (data: any) => ({
  ...data,
  success: true,
});

export default {
  returnSuccess,
  returnError,
};
