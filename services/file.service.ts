import fs from "fs";
import logger from "../configs/logger.js";
import PlayerInfo from "../interfaces/playerInfo.js";

const readFile = (jsonFilePath: string): PlayerInfo[] => {
  try {
    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    if (!fileContent) {
      return [];
    }

    return JSON.parse(fileContent).map(
      (player: { name: string; rating: number }) =>
        <PlayerInfo>{
          name: player.name,
          rating: player.rating,
        }
    );
  } catch (error) {
    console.error("There was an error reading from the JSON file: ", error);
    logger.error("Error reading JSON file: ", error);

    return [];
  }
};

export { readFile };
