import EnvironmentVariables from "../models/environmentVariables.js";
import validate from "../validators/environmentVariables.validator.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../src/.env") });

const getEnvironmentVariables = () => {
  validate(process.env.TOKEN);

  return new EnvironmentVariables(
    process.env.TOKEN,
    process.env.ALLOWED_IDS,
    process.env.GENERATE_COMMAND,
    process.env.TIMEZONE,
    process.env.LANGUAGE,
    process.env.IS_PRODUCTION
  );
};

export default getEnvironmentVariables;
