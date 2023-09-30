declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_IDS: string;
      GENERATE_COMMAND: string;
      LANGUAGE: string;
      TIME_ZONE: string;
      TOKEN: string;
      IS_PRODUCTION: string;
      DEFAULT_NUMBER_OF_TEAMS: string;
    }
  }
}

export {};
