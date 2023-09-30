/**
 * Validates the presence of a token.
 *
 * @param {string} token - The token to validate.
 * @throws {Error} Throws an error if the token is missing.
 */
const validateToken = (token: string) => {
  if (!token) {
    throw new Error("Token is required.");
  }
};

export { validateToken };
