import GenerateTeamHandlerResponse from "../classes/generateTeamHandlerResponse.js";

const validate = (
  numberOfTeams: number
): GenerateTeamHandlerResponse<string> => {
  if (numberOfTeams <= 0) {
    return {
      success: false,
      error: `Invalid number of team: ${numberOfTeams}.`,
      data: "",
    };
  }

  return {
    success: true,
    data: "",
  };
};

export default validate;
