import EnvironmentVariables from "../interfaces/environment-variables.js";
import { validateToken } from "../validators/environment-variables.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
import { isNumber } from "../validators/number.js";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const getEnvironmentVariables = (): EnvironmentVariables => {
  validateToken(process.env.TOKEN ?? "");

  const allowedIds =
    process.env.ALLOWED_IDS?.split(",")
      .filter((id) => isNumber(id))
      .map((id) => Number(id)) ?? [];

  const isProduction =
    typeof process.env.IS_PRODUCTION === "string"
      ? Boolean(process.env.IS_PRODUCTION)
      : true;
      
  const defaultNumberOfTeams = isNumber(
    process.env.DEFAULT_NUMBER_OF_TEAMS ?? ""
  )
    ? Number(process.env.DEFAULT_NUMBER_OF_TEAMS)
    : 2;

  return <EnvironmentVariables>{
    token: process.env.TOKEN,
    allowedIds: allowedIds,
    generateCommand: process.env.GENERATE_COMMAND,
    isProduction: isProduction,
    language: process.env.LANGUAGE,
    timeZone: process.env.TIME_ZONE,
    defaultNumberOfTeams: defaultNumberOfTeams,
  };
};

export default getEnvironmentVariables;
