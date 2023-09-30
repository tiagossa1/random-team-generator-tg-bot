import { Context } from "telegraf";
import getEnvironmentVariables from "../configs/environment.js";
import logger from "../configs/logger.js";
import { Update } from "@telegraf/types";

/**
 * Validates the user or chat context for team generation.
 *
 * @param {any} ctx - The context object containing user and chat information.
 * @param {any} next - The next middleware function to call if validation succeeds.
 */
const validateUserOrChat = (
  ctx: Context<Update>,
  next: () => Promise<void>
) => {
  const { allowedIds } = getEnvironmentVariables();
  if (!ctx.chat || !ctx.from) {
    logger.error(`Could not validate user - denying access.`);
  }

  const isGroup = ctx.chat !== null && ctx.chat !== undefined;

  if (
    !allowedIds.includes(Number(ctx.from?.id)) ||
    !allowedIds.includes(Number(ctx.chat?.id))
  ) {
    logger.error(
      `User ${ctx.from?.first_name} ${ctx.from?.last_name} (${ctx.from?.username}) with ID ${ctx.from?.id} tried to generate a team - message sent: ${ctx.message}`
    );

    if (isGroup) {
      logger.info(`This request came from a ${ctx.chat.type ?? ""}.`);
    }

    return;
  }

  return next();
};

export { validateUserOrChat };
