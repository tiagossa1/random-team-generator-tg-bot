/**
 * Generates a human-readable message representing teams and their players.
 *
 * @param {Record<string, string[]>} teams - An object where keys are team names, and values are arrays of team players.
 * @returns {string} A formatted message displaying the teams and their respective players.
 *                  An empty string is returned if the input teams object is falsy.
 *
 * @example
 * // Example usage:
 * const teamsData = {
 *   "Team A": ["Player 1", "Player 2"],
 *   "Team B": ["Player 3", "Player 4"],
 * };
 * const message = generateReadableTeamsMessage(teamsData);
 * // Output:
 * // "*Team A:*
 * // Player 1
 * // Player 2
 * //
 * // *Team B:*
 * // Player 3
 * // Player 4
 * //"
 */
const generateReadableTeamsMessage = (teams: Record<string, string[]>) => {
  if (!teams) return "";

  let msg = "";

  for (var teamName in teams) {
    msg += `*${teamName}:*`;

    if (teams.hasOwnProperty(teamName)) {
      msg += "\n";
      teams[teamName].forEach((teamPlayer) => {
        msg += teamPlayer + "\n";
      });
    }

    msg += "\n";
  }

  return msg;
};

export { generateReadableTeamsMessage };
