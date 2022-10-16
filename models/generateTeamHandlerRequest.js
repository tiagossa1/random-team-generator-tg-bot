class GenerateTeamHandlerRequest {
  constructor(chatId, userInformation, numberOfTeams = 2, playersToIgnore = []) {
    this.chatId = chatId;
    this.numberOfTeams = numberOfTeams;
    this.playersToIgnore = playersToIgnore;
    this.userInformation = userInformation;
  }
}

export default GenerateTeamHandlerRequest;