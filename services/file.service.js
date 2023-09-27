import fs from "fs";
import logger from "../configs/logger.js";
import PlayerInfo from "../models/playerInfo.js";

const readFile = (jsonFilePath) => {
  try {
    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    if (!fileContent) {
      return [];
    }

    return JSON.parse(fileContent).map(
      (player) => new PlayerInfo(player.name, player.rating)
    );
  } catch (error) {
    console.error("There was an error reading from the JSON file: ", error);
    logger.error("Error reading JSON file: ", error);

    return [];
  }
};

export { readFile };
