import {
  randomBetween,
  getAlphabetCharacterBasedOnNumber,
} from "../utils/number.utils.js";

const NO_TEAM = "De fora";

const generateTeam = (numberOfTeams, teamPlayers) => {
  const copyTeamPlayers = [...teamPlayers];
  const numberOfPlayers = copyTeamPlayers.length;
  // PlayersForEachTeam is round down to avoid decimal numbers and to generate players that do NOT have a team.
  const playersForEachTeam = Math.floor(numberOfPlayers / numberOfTeams);

  let teams = {};

  for (let noTeamsIndex = 0; noTeamsIndex < numberOfTeams; noTeamsIndex++) {
    let playersForTeam = [];

    for (
      let playersForEachTeamIndex = 0;
      playersForEachTeamIndex < playersForEachTeam;
      playersForEachTeamIndex++
    ) {
      // 1 - Generate a VALID index based on copyTeamPlayers' length.
      // 2 - Get the players based on the generated index.
      // 3 - Push into the array.
      // 4 - Remove that player from copyTeamPlayers' array based on 1. index.
      const randomIndex = randomBetween(0, copyTeamPlayers.length - 1);
      const playerForTeam = copyTeamPlayers[randomIndex];

      playersForTeam.push(playerForTeam);
      copyTeamPlayers.splice(randomIndex, 1);
    }

    const teamName = `Equipa ${getAlphabetCharacterBasedOnNumber(noTeamsIndex)}`;
    teams[teamName] = playersForTeam;
  }

  // Check if the original array still has players. If so, they will be put on a 'No Team' array.
  if (copyTeamPlayers.length > 0) {
    teams[NO_TEAM] = copyTeamPlayers;
  }

  return teams;
};

export { generateTeam };
