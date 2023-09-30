import EnvironmentVariables from "../interfaces/environmentVariables.js";
import validate from "../validators/environmentVariables.validator.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../src/.env") });

const getEnvironmentVariables = (): EnvironmentVariables => {
  validate(process.env.TOKEN ?? "");

  const allowedIds = process.env.ALLOWED_IDS.split(",");
  const isProduction = Boolean(process.env.IS_PRODUCTION);

  return {
    token: process.env.TOKEN,
    allowedIds: allowedIds,
    generateCommand: process.env.GENERATE_COMMAND,
    isProduction: isProduction,
    language: process.env.LANGUAGE,
    timeZone: process.env.TIME_ZONE,
  };
};

export default getEnvironmentVariables;
