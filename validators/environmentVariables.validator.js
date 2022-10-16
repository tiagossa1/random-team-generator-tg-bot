const validate = (token, teamPlayers) => {
  if (!token) {
    throw new Error("Token is required.");
  }

  if (!teamPlayers) {
    throw new Error("Team players array is required.");
  }
};

export default validate;
