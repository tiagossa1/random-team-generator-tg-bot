import PlayerInfo from "../interfaces/player-info.js";
import { getAlphabetCharacterBasedOnNumber } from "../utils/number.js";

import _ from "lodash";

const NO_TEAM = "De fora";

/**
 * Generates teams from a list of players based on specified criteria.
 *
 * @param {number} numberOfTeams - The number of teams to generate.
 * @param {PlayerInfo[]} teamPlayers - An array of player information to form teams.
 * @param {string[]} playersToIgnore - An array of player names to exclude from team formation.
 * @returns {Record<string, string[]>} An object representing teams with team names as keys and arrays of player names as values.
 */
const generateTeam = (
  numberOfTeams: number,
  teamPlayers: PlayerInfo[],
  playersToIgnore: string[]
) => {
  const sortedPlayers = _(
    _(teamPlayers)
      .reject((player) => _(playersToIgnore).includes(player.name))
      .value()
  )
    .orderBy(["rating"], ["desc"])
    .value();

  const playersForEachTeam = Math.floor(sortedPlayers.length / numberOfTeams);

  const [firstPartOfPlayers, secondPartOfPlayers] = _(sortedPlayers)
    .chunk(Math.ceil(sortedPlayers.length / 2))
    .value();

  const teams: Record<string, string[]> = {};

  for (let i = 0; i < numberOfTeams; i++) {
    const key = `Equipa ${getAlphabetCharacterBasedOnNumber(i)}`;
    teams[key] = [];

    for (let j = 0; j < playersForEachTeam; j++) {
      if (j % 2 !== 0) {
        let player;

        if (secondPartOfPlayers.length > 0) {
          player = randomAndTakeFromTeam(secondPartOfPlayers);
        } else {
          player = randomAndTakeFromTeam(firstPartOfPlayers);
        }

        teams[key].push(player.name);
      } else {
        let player: PlayerInfo;

        if (firstPartOfPlayers.length > 0) {
          player = randomAndTakeFromTeam(firstPartOfPlayers);
        } else {
          player = randomAndTakeFromTeam(secondPartOfPlayers);
        }

        teams[key].push(player.name);
      }
    }
  }

  const playersWithNoTeam = _(playersToIgnore ?? [])
    .concat(
      _(firstPartOfPlayers)
        .map((player) => player.name)
        .value(),
      _(secondPartOfPlayers)
        .map((player) => player.name)
        .value()
    )
    .value();

  if (playersWithNoTeam?.length > 0) {
    teams[NO_TEAM] = playersWithNoTeam;
  }

  return teams;
};

/**
 * Selects a random player from a team, removes them from the team, and returns the selected player.
 *
 * @param {PlayerInfo[]} team - The array of players representing the team.
 * @returns {PlayerInfo} The randomly selected player from the team.
 */
const randomAndTakeFromTeam = (team: PlayerInfo[]): PlayerInfo => {
  const player = <PlayerInfo>_(team).sample();

  const indexToRemove = team.findIndex(
    (p) => p.name === player.name && p.rating === player.rating
  );

  if (indexToRemove >= 0) {
    team.splice(indexToRemove, 1);
  }

  return player;
};

export { generateTeam };
