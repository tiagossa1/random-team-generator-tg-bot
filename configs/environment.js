import * as dotenv from "dotenv";
dotenv.config();

import EnvironmentVariables from "../models/environmentVariables.js";
import validate from "../validators/environmentVariables.validator.js";

const getEnvironmentVariables = () => {
  validate(process.env.TOKEN, process.env.TEAM_PLAYERS);

  return new EnvironmentVariables(
    process.env.TOKEN,
    process.env.ALLOWED_IDS,
    process.env.TEAM_PLAYERS,
    process.env.GENERATE_COMMAND,
    process.env.TIMEZONE,
    process.env.LANGUAGE,
    process.env.IS_PRODUCTION
  );
};

export default getEnvironmentVariables;
