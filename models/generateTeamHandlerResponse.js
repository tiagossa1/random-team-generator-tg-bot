class GenerateTeamHandlerResponse {
  constructor({ error = null, data = null, success = null }) {
    this.success = success ?? !error;
    this.error = error;
    this.data = data;
  }
}

export default GenerateTeamHandlerResponse;
