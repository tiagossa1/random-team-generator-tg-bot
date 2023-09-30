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

let players: PlayerInfo[] = [];

const jsonFilePath = "data/teamPlayers.json";
const watcher = chokidar.watch(jsonFilePath);

watcher.on("change", () => {
  players = readFile(jsonFilePath);
});

players = readFile(jsonFilePath);

const envVars = getEnvironmentVariables();

const bot = new Telegraf(envVars.token);

// Define middlewares:
// validateUserOrChat - Will validate if the user/chat ID is in the allowed IDs.
bot.use(validateUserOrChat);

const generateTeamRegEx = new RegExp(
  `/${envVars.generateCommand} (\\d+)(\\s)?(.+)?`
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

  // TODO: There should be a service that gets all the message parameters in a nice format and type.
  const numberOfTeams =
    typeof ctx.match[1] === "string" && !Number.isNaN(ctx.match[1])
      ? Number(ctx.match[1])
      : 2;

  const playersToIgnore = ctx.match[3]?.split(" ")?.filter((player) => player);

  const request: GenerateTeamHandlerRequest = {
    chatId: ctx.chat.id,
    userInformation: userInformation,
    players: players,
    numberOfTeams: numberOfTeams,
    playersToIgnore: playersToIgnore,
  };

  logger.info(
    `Received a request to generate teams from user ${userInformation.fullName} (${userInformation.userName}) (${request.chatId}).`
  );

  const response = onGenerateTeamHandler(request);

  if (!response.success) {
    logger.error(response.error);
    return;
  }

  logger.info(`Generated the following team: ${response.data}`);
  ctx.replyWithMarkdownV2(response.data ?? "");
});

bot.launch();

// Graceful stop bot once the application closes.
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot is running.");
