// Constructs a string with teams.
// e.g.
// Team A:
// Player 1
// Player 2
// Player 3
//
// Team B:
// Player 1
// Player 2
// Player 3
const generateReadableTeamsMessage = (teams) => {
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
