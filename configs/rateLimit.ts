const rateLimitConfiguration = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx: any, next: any) =>
    ctx.reply("Limit exceeded. Please, try again later."),
};

export default rateLimitConfiguration;
