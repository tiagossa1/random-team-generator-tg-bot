const rateLimitConfiguration = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) =>
    ctx.reply("Limit exceeded. Please, try again later."),
};

export default rateLimitConfiguration;
