const validate = (token: string) => {
  if (!token) {
    throw new Error("Token is required.");
  }
};

export default validate;
