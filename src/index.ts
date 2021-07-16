import * as dotenv from "dotenv";
import { Context, Telegraf } from "telegraf";

import common from "./common";
import modules from "./modules";

dotenv.config();

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

modules.map((module) => {
  console.log(`Loading module: ${module.name}`);
  bot.hears(module.match, (ctx) => {
    let params = "";
    params = ctx.match[1];

    module.handler(ctx as Context, params);
  });
});

common.register(bot);
bot.launch();
