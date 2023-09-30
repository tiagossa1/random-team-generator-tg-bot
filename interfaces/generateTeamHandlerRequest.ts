import UserInformation from "../classes/userInformation.js";
import PlayerInfo from "./playerInfo.js";

export default interface GenerateTeamHandlerRequest {
  chatId: number;
  userInformation: UserInformation;
  players: PlayerInfo[];
  numberOfTeams: number;
  playersToIgnore: string[];
}
