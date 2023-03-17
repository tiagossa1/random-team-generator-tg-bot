import PlayerInfo from "./playerInfo.js";

class EnvironmentVariables {
  constructor(
    token,
    allowedIds,
    teamPlayers,
    generateCommand,
    timeZone,
    language,
    isProduction
  ) {
    this.token = token;
    this.allowedIds = (allowedIds ?? []).split(",").map((id) => Number(id));
    this.teamPlayers = JSON.parse(teamPlayers).map(
      (teamPlayer) => new PlayerInfo(teamPlayer.name, teamPlayer.rating)
    );
    this.generateCommand = generateCommand ?? "generate";
    this.timeZone = timeZone ?? "Etc/UTC";
    this.language = language ?? "en-US";
    this.isProduction = isProduction ?? false;
  }
}

export default EnvironmentVariables;
