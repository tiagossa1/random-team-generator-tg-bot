import * as dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import logger from "./configs/logger.js";

import GenerateTeamHandlerRequest from "./models/generateTeamHandlerRequest.js";
import UserInformation from "./models/userInformation.js";
import { onGenerateTeamHandler } from "./services/commands.service.js";

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("polling_error", (error) => {
  logger.error("There was an error receiving/sending a message: " + error);
});

bot.onText(/\/gerar (\d+)(\s)?(.+)?/, (msg, match) => {
  const userInformation = new UserInformation(
    msg.from?.id,
    msg.from?.username,
    msg.from?.first_name,
    msg.from?.last_name
  );

  const numberOfTeams = match[1];
  const playersToIgnore = match[3]?.split(" ")?.filter((player) => player);

  const request = new GenerateTeamHandlerRequest(
    msg.chat.id,
    userInformation,
    numberOfTeams,
    playersToIgnore,
  );

  logger.info(
    `Received a request to generate teams from user ${userInformation.fullName} (${userInformation.userName}) (${msg.chat.id}).`
  );

  const response = onGenerateTeamHandler(request);

  if (!response.success) {
    logger.error(response.error);
    return;
  }

  logger.info(`Generated the following team: ${JSON.stringify(response.data)}`);

  bot.sendMessage(msg.chat.id, response.data, { parse_mode: "Markdown" });
});

console.log("Bot is running.");
