import { getAlphabetCharacterBasedOnNumber } from "../utils/number.utils.js";

import _ from "lodash";

const NO_TEAM = "De fora";

// The above code works by sorting the players by their rating in descending order, and then assigning them to teams in a round-robin fashion, with each team getting one player at a time until all the players are assigned. 
// The currentTeam variable keeps track of the index of the team to which the next player should be assigned in a round-robin fashion.

const generateTeam = (numberOfTeams, teamPlayers, playersToIgnore) => {
  // Sort players by rating in descending order
  const sortedPlayers = _(teamPlayers)
    .sortBy((player) => -player.rating)
    .value();

  const playersPerTeam = Math.floor(sortedPlayers.length / numberOfTeams);
  const remainder = sortedPlayers.length % numberOfTeams;

  const teams = [];
  for (let i = 0; i < numberOfTeams; i++) {
    teams.push([]);
  }

  // Assign players to teams in a round-robin fashion
  let currentTeam = 0;
  for (let i = 0; i < sortedPlayers.length; i++) {
    const player = sortedPlayers[i];
    teams[currentTeam].push(player);
    currentTeam = (currentTeam + 1) % numberOfTeams;
  }

  // If there is a remainder, distribute the remaining players evenly among the teams
  if (remainder > 0) {
    let i = 0;
    while (i < remainder) {
      teams[i].push(sortedPlayers.pop());
      i++;
    }
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
