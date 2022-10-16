import GenerateTeamHandlerResponse from "../models/generateTeamHandlerResponse.js";

const validate = (numberOfTeams) => {
  if (numberOfTeams <= 0) {
    return new GenerateTeamHandlerResponse({
      success: false,
      error: `Invalid number of team: ${numberOfTeams}.`,
    });
  }

  return new GenerateTeamHandlerResponse({
    success: true,
  });
};

export default validate;
