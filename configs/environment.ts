import EnvironmentVariables from "../interfaces/environment-variables.js";
import validate from "../validators/environment-variables.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const getEnvironmentVariables = (): EnvironmentVariables => {
  validate(process.env.TOKEN ?? "");

  const allowedIds = process.env.ALLOWED_IDS?.split(",") ?? [];
  const isProduction = Boolean(process.env.IS_PRODUCTION);

  return <EnvironmentVariables>{
    token: process.env.TOKEN,
    allowedIds: allowedIds,
    generateCommand: process.env.GENERATE_COMMAND,
    isProduction: isProduction,
    language: process.env.LANGUAGE,
    timeZone: process.env.TIME_ZONE,
  };
};

export default getEnvironmentVariables;
