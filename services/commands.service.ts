import { generateTeam } from "./team.service.js";
import { generateReadableTeamsMessage } from "../utils/output.utils.js";
import GenerateTeamHandlerResponse from "../classes/generateTeamHandlerResponse.js";
import validate from "../validators/generateTeamHandler.validator.js";
import GenerateTeamHandlerRequest from "../interfaces/generateTeamHandlerRequest.js";

const onGenerateTeamHandler = (
  request: GenerateTeamHandlerRequest
): GenerateTeamHandlerResponse<string> => {
  const validatorResponse = validate(request.numberOfTeams);

  if (!validatorResponse.success) {
    return validatorResponse;
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

  return {
    success: true,
    data: generateReadableTeamsMessage(teams),
  };
};

export { onGenerateTeamHandler };
