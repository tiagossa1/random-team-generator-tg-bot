import { getAlphabetCharacterBasedOnNumber } from "../utils/number.utils.js";

import _ from "lodash";

const NO_TEAM = "De fora";

const generateTeam = (numberOfTeams, teamPlayers, playersToIgnore) => {
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

  const teams = {};

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
        let player;

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

const randomAndTakeFromTeam = (team) => {
  const player = _(team).sample();
  const indexToRemove = team.findIndex(
    (p) => p.name === player.name && p.rating === player.rating
  );

  if (indexToRemove >= 0) {
    team.splice(indexToRemove, 1);
  }

  return player;
};

export { generateTeam };
