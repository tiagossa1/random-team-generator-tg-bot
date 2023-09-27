import { Telegraf } from "telegraf";
import rateLimit from "telegraf-ratelimit";
import chokidar from "chokidar";
import fs from "fs";

import getEnvironmentVariables from "./configs/environment.js";
import rateLimitConfiguration from "./configs/rateLimit.js";
import logger from "./configs/logger.js";

import GenerateTeamHandlerRequest from "./models/generateTeamHandlerRequest.js";
import UserInformation from "./models/userInformation.js";
import PlayerInfo from "./models/playerInfo.js";

import { validateUserOrChat } from "./middleware/telegraf.middleware.js";
import { onGenerateTeamHandler } from "./services/commands.service.js";
import { readFile } from "./services/file.service.js";

let players = [];

const jsonFilePath = "data/teamPlayers.json";
const watcher = chokidar.watch(jsonFilePath);

watcher.on("change", () => {
  players = readFile(jsonFilePath);
  console.log(players);
});

players = readFile(jsonFilePath);

console.log(players);

const envVars = getEnvironmentVariables();

const bot = new Telegraf(envVars.token);

// Define middlewares:
// validateUserOrChat - Will validate if the user/chat ID is in the allowed IDs.
// rateLimit - Will rate limit all of the bot's actions against possible hacker attack.
bot.use(validateUserOrChat);
bot.use(rateLimit(rateLimitConfiguration));

const generateTeamRegEx = new RegExp(
  `/${envVars.generateCommand} (\\d+)(\\s)?(.+)?`
);

bot.catch((err, ctx) => {
  logger.error(`There was an error: ${err}`);
});

bot.hears(generateTeamRegEx, (ctx) => {
  const userInformation = new UserInformation(
    ctx.from.id,
    ctx.from.user_name,
    ctx.from.first_name,
    ctx.from.last_name
  );

  const numberOfTeams = ctx.match[1];
  const playersToIgnore = ctx.match[3]?.split(" ")?.filter((player) => player);

  const request = new GenerateTeamHandlerRequest(
    ctx.chat.id,
    userInformation,
    players,
    numberOfTeams,
    playersToIgnore
  );

  logger.info(
    `Received a request to generate teams from user ${userInformation.fullName} (${userInformation.userName}) (${request.chatId}).`
  );

  const response = onGenerateTeamHandler(request);

  if (!response.success) {
    logger.error(response.error);
    return;
  }

  logger.info(`Generated the following team: ${response.data}`);
  ctx.replyWithMarkdownV2(response.data);
});

bot.launch();

// Graceful stop bot once the application closes.
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot is running.");
