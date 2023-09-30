import { Telegraf } from "telegraf";
import chokidar from "chokidar";

import getEnvironmentVariables from "./configs/environment.js";
import logger from "./configs/logger.js";

import GenerateTeamHandlerRequest from "./interfaces/generate-team-handler-request.js";
import UserInformation from "./classes/user-information.js";

import { validateUserOrChat } from "./middleware/telegraf.js";
import { onGenerateTeamHandler } from "./services/commands.js";
import { readFile } from "./services/file.js";
import PlayerInfo from "./interfaces/player-info.js";
import { getMessageParameters } from "./services/generate-team-message.js";

let players: PlayerInfo[] = [];

const jsonFilePath = "data/teamPlayers.json";
const watcher = chokidar.watch(jsonFilePath);

watcher.on("change", () => {
  players = readFile(jsonFilePath);
});

players = readFile(jsonFilePath);

const environmentVariables = getEnvironmentVariables();

const bot = new Telegraf(environmentVariables.token);

// Define middlewares:
// validateUserOrChat - Will validate if the user/chat ID is in the allowed IDs.
bot.use(validateUserOrChat);

const generateTeamRegEx = new RegExp(
  `/${environmentVariables.generateCommand} (\\d+)(\\s)?(.+)?`
);

bot.catch((err) => {
  logger.error(`There was an error: ${err}`);
});

bot.hears(generateTeamRegEx, (ctx) => {
  const userInformation = new UserInformation(
    ctx.from.id,
    ctx.from.username ?? "",
    ctx.from.first_name,
    ctx.from.last_name ?? ""
  );

  const messageParameters = getMessageParameters(
    ctx.match,
    environmentVariables.defaultNumberOfTeams
  );

  const request: GenerateTeamHandlerRequest = {
    chatId: ctx.chat.id,
    userInformation: userInformation,
    players: players,
    numberOfTeams: messageParameters.numberOfTeams,
    playersToIgnore: messageParameters.playerNamesToIgnore,
  };

  logger.info(
    `Received a request to generate teams from user/group ${
      userInformation.fullName
    } (${userInformation.userName ?? "no username"}) (${request.chatId}).`
  );

  const response = onGenerateTeamHandler(request);

  if (!response.success) {
    logger.error(response.error);
    return;
  }

  ctx.replyWithMarkdownV2(response.data ?? "");
});

bot.launch();

// Graceful stop bot once the application closes.
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot is running.");
