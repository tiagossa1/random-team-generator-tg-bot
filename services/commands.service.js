import * as dotenv from "dotenv";
dotenv.config();

import { generateTeam } from "./team.service.js";
import { generateReadableTeamsMessage } from "../utils/output.utils.js";
import GenerateTeamHandlerResponse from "../models/generateTeamHandlerResponse.js";

const ALLOWED_IDS = process.env.ALLOWED_IDS.split(",").map((id) => Number(id));
const TEAM_PLAYERS = process.env.TEAM_PLAYERS.split(",").map(
  (teamPlayer) => teamPlayer
);

const onGenerateTeamHandler = (request) => {
  // Check if user id matches the one from the allowed list.
  if (
    !ALLOWED_IDS.includes(request.userInformation.id) ||
    !ALLOWED_IDS.includes(request.chatId)
  ) {
    return new GenerateTeamHandlerResponse(
      `User ${request.userInformation.fullName} (${request.userInformation.userName}) with ID ${request.chatId} tried to generate a team.`
    );
  }

  if (request.numberOfTeams <= 0) {
    return new GenerateTeamHandlerResponse(
      `User ${request.userInformation.fullName} (${request.userInformation.userName}) with ID ${request.chatId} tried to generate a team, but sent an invalid number of team: ${request.numberOfTeams}.`
    );
  }

  let teamPlayersToUse = [...TEAM_PLAYERS];

  // If there any players to ignore, check against the .env player names and ignore those that are in the players ignore array.
  if (request.playersToIgnore) {
    teamPlayersToUse = teamPlayersToUse.filter(
      (tp) =>
        !request.playersToIgnore.some(
          (pi) => pi.toLowerCase() === tp.toLowerCase()
        )
    );
  }

  let teams = generateTeam(request.numberOfTeams, teamPlayersToUse, request.playersToIgnore);

  return new GenerateTeamHandlerResponse(
    null,
    generateReadableTeamsMessage(teams),
    true
  );
};

export { onGenerateTeamHandler };
