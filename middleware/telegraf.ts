import getEnvironmentVariables from "../configs/environment.js";
import logger from "../configs/logger.js";

/**
 * Validates the user or chat context for team generation.
 *
 * @param {any} ctx - The context object containing user and chat information.
 * @param {any} next - The next middleware function to call if validation succeeds.
 */
const validateUserOrChat = (ctx: any, next: any) => {
  const { allowedIds, isProduction } = getEnvironmentVariables();

  if (!allowedIds.includes(ctx.from.id) || !allowedIds.includes(ctx.chat.id)) {
    logger.error(
      `User ${ctx.from.first_name} (${ctx.from.user_name}) with ID ${ctx.from.id} tried to generate a team.`
    );

    if (ctx.chat && !isProduction) {
      logger.debug(
        `This request came from a ${ctx.chat.type ?? ""} named ${
          ctx.chat.title ?? ""
        }`
      );
    }

    return;
  }

  return next();
};

export { validateUserOrChat };
