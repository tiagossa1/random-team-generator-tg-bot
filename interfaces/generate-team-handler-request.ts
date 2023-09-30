import UserInformation from "../classes/user-information.js";
import PlayerInfo from "./player-info.js";

export default interface GenerateTeamHandlerRequest {
  chatId: number;
  userInformation: UserInformation;
  players: PlayerInfo[];
  numberOfTeams: number;
  playersToIgnore: string[];
}
