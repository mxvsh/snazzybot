import { Telegraf } from "telegraf";

// Commands
import start from "./start";
import help from "./help";

const register = (bot: Telegraf) => {
  bot.start(start);
  bot.help(help);
};

export default { register };
