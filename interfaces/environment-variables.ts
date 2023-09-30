export default interface EnvironmentVariables {
  token: string;
  allowedIds: string[];
  generateCommand: string;
  timeZone: string;
  language: string;
  isProduction: boolean;
}
