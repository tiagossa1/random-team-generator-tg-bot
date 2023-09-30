const validate = (token) => {
  if (!token) {
    throw new Error("Token is required.");
  }
};

export default validate;
