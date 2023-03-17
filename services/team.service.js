import { getAlphabetCharacterBasedOnNumber } from "../utils/number.utils.js";

import _ from "lodash";

const NO_TEAM = "De fora";

const generateTeam = (numberOfTeams, teamPlayers, playersToIgnore) => {
  // Sort players by rating in descending order
  const sortedPlayers = _(teamPlayers)
    .sortBy((player) => player.rating)
    .value();

  const teams = [];
  for (let i = 0; i < numberOfTeams; i++) {
    teams.push([]);
  }

  // Assign players to teams based on the lowest total rating
  while (sortedPlayers.length > 0) {
    // Find the team with the lowest total rating
    const lowestTeam = teams.reduce((prev, curr) => {
      return prev.reduce((total, p) => total + p.rating, 0) <=
        curr.reduce((total, p) => total + p.rating, 0)
        ? prev
        : curr;
    });

    // Add a random player to the lowest team
    const randomIndex = Math.floor(Math.random() * sortedPlayers.length);
    const player = sortedPlayers.splice(randomIndex, 1)[0];

    lowestTeam.push(player);
  }

  let response = {};

  teams.forEach((playerTeam, index) => {
    response[`Equipa ${getAlphabetCharacterBasedOnNumber(index)}`] = _(
      playerTeam
    )
      .orderBy((player) => player.name)
      .map((player) => player.name)
      .value();
  });

  if (playersToIgnore?.length > 0) {
    response[NO_TEAM] = playersToIgnore;
  }

  return response;
};

export { generateTeam };
