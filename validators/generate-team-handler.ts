import GenerateTeamHandlerResponse from "../classes/generate-team-handler-response.js";

/**
 * Validates the number of teams for team generation.
 *
 * @param {number} numberOfTeams - The number of teams to validate.
 * @returns {GenerateTeamHandlerResponse<string>} An object indicating the validation result.
 * @throws {Error} Throws an error if the number of teams is invalid.
 */
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
