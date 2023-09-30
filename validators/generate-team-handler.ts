import GenerateTeamHandlerResponse from "../classes/generate-team-handler-response.js";

/**
 * Validates the number of teams for team generation.
 *
 * @param {number} numberOfTeams - The number of teams to validate.
 * @returns {GenerateTeamHandlerResponse<null>} An object indicating the validation result.
 * @throws {Error} Throws an error if the number of teams is invalid.
 */
const validate = (numberOfTeams: number): GenerateTeamHandlerResponse<null> => {
  if (numberOfTeams <= 0) {
    return {
      success: false,
      error: `Invalid number of team: ${numberOfTeams}.`,
    };
  }

  return {
    success: true,
  };
};

export default validate;
