import { generateTeam } from "./team.js";
import { generateReadableTeamsMessage } from "../utils/output.js";
import GenerateTeamHandlerResponse from "../classes/generate-team-handler-response.js";
import validate from "../validators/generate-team-handler.js";
import GenerateTeamHandlerRequest from "../interfaces/generate-team-handler-request.js";
import logger from "../configs/logger.js";

/**
 * Handles the generation of teams based on the provided request parameters.
 *
 * @param {GenerateTeamHandlerRequest} request - The request containing information for generating teams.
 * @returns {GenerateTeamHandlerResponse<string>} The response containing the generated teams' message.
 */
const onGenerateTeamHandler = (
  request: GenerateTeamHandlerRequest
): GenerateTeamHandlerResponse<string> => {
  const validatorResponse = validate(request.numberOfTeams);

  if (!validatorResponse.success) {
    return <GenerateTeamHandlerResponse<string>>{
      error: validatorResponse.error,
      success: validatorResponse.success,
    };
  }

  let playersToUse = [...request.players];

  // If there any players to ignore, check against the .env player names and ignore those that are in the players ignore array.
  if (request.playersToIgnore) {
    playersToUse = playersToUse.filter(
      (player) =>
        !request.playersToIgnore.some(
          (playerToIgnore) =>
            playerToIgnore.toLowerCase() === player.name.toLowerCase()
        )
    );
  }

  let teams = generateTeam(
    request.numberOfTeams,
    playersToUse,
    request.playersToIgnore
  );

  logger.info(`Generated the following teams: ${printTeams(teams)}`);

  return {
    success: true,
    data: generateReadableTeamsMessage(teams),
  };
};

/**
 * Converts a Record<string, string[]> into a user-friendly string.
 *
 * @param {Record<string, string[]>} teams - The record of teams where keys are team names and values are arrays of team players.
 * @returns {string} - A user-friendly representation of the teams.
 */
const printTeams = (teams: Record<string, string[]>): string => {
  let result = "";

  for (const teamName in teams) {
    if (teams.hasOwnProperty(teamName)) {
      result += `${teamName}:`;
      teams[teamName].forEach((teamPlayer) => {
        result += `  - ${teamPlayer}\n`;
      });
    }
  }

  return result;
};

export { onGenerateTeamHandler };
