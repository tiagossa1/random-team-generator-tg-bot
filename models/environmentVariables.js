class EnvironmentVariables {
  constructor(
    token,
    allowedIds,
    generateCommand,
    timeZone,
    language,
    isProduction
  ) {
    this.token = token;
    this.allowedIds = (allowedIds ?? []).split(",").map((id) => Number(id));
    this.generateCommand = generateCommand ?? "generate";
    this.timeZone = timeZone ?? "Etc/UTC";
    this.language = language ?? "en-US";
    this.isProduction = isProduction ?? false;
  }
}

export default EnvironmentVariables;
