export default interface EnvironmentVariables {
  token: string;
  allowedIds: number[];
  generateCommand: string;
  timeZone: string;
  language: string;
  isProduction: boolean;
  defaultNumberOfTeams: number;
}
