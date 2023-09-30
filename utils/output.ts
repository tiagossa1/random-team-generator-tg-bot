/**
 * Returns each generated teams in a string format to be sent to the requestor.
 * 
 * String format:
 * 
 * Team A:
 * 
 * Player 1
 * 
 * Player 2
 * 
 * Player 3
 * 
 * 
 * Team B:
 * 
 * Player 1
 * 
 * Player 2
 * 
 * Player 3
 * @param teams Generated teams
 * @returns string
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
