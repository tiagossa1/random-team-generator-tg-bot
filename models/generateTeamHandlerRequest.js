class GenerateTeamHandlerRequest {
  constructor(
    chatId,
    userInformation,
    players,
    numberOfTeams = 2,
    playersToIgnore = []
  ) {
    this.chatId = chatId;
    this.userInformation = userInformation;
    this.players = players;
    this.numberOfTeams = Number(numberOfTeams);
    this.playersToIgnore = playersToIgnore;
  }
}

export default GenerateTeamHandlerRequest;
