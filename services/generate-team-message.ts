import GenerateTeamMessageParameters from "../interfaces/generate-team-message-parameters.js";
import { isNumber } from "../validators/number.js";

const getMessageParameters = (
  regexMatch: RegExpExecArray,
  defaultNumberOfTeams: number
): GenerateTeamMessageParameters => {
  if (!regexMatch)
    return {
      numberOfTeams: -1,
      playerNamesToIgnore: [],
    };

  const numberOfTeams = isNumber(regexMatch[1])
    ? Number(regexMatch[1])
    : defaultNumberOfTeams;

  const playerNamesToIgnore = regexMatch[3]
    ?.split(" ")
    ?.filter((player) => player);

  return {
    numberOfTeams: numberOfTeams,
    playerNamesToIgnore: playerNamesToIgnore,
  };
};

export { getMessageParameters };
