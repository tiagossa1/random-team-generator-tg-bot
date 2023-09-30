export default interface GenerateTeamHandlerResponse<T> {
  success: boolean;
  error?: any;
  data?: T;
}
