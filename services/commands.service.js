import getEnvironmentVariables from "../configs/environment.js";
import { generateTeam } from "./team.service.js";
import { generateReadableTeamsMessage } from "../utils/output.utils.js";
import GenerateTeamHandlerResponse from "../models/generateTeamHandlerResponse.js";
import validate from "../validators/generateTeamHandler.validator.js";

const { teamPlayers } = getEnvironmentVariables();

const onGenerateTeamHandler = (request) => {
  const validatorResponse = validate(request.numberOfTeams);

  if (!validatorResponse.success) {
    return validatorResponse;
  }

  let teamPlayersToUse = [...teamPlayers];

  // If there any players to ignore, check against the .env player names and ignore those that are in the players ignore array.
  if (request.playersToIgnore) {
    teamPlayersToUse = teamPlayersToUse.filter(
      (player) =>
        !request.playersToIgnore.some(
          (playerToIgnore) => playerToIgnore.toLowerCase() === player.name.toLowerCase()
        )
    );
  }

  let teams = generateTeam(
    request.numberOfTeams,
    teamPlayersToUse,
    request.playersToIgnore
  );

  return new GenerateTeamHandlerResponse({
    data: generateReadableTeamsMessage(teams),
    success: true,
  });
};

export { onGenerateTeamHandler };
