import path from "path";
import RiveScript from "rivescript";
import { Context, Telegraf } from "telegraf";

const rivebot = new RiveScript();

const initBot = () => {
  rivebot.sortReplies();
};

rivebot
  .loadDirectory(path.join(__dirname, "brain"))
  .then(initBot)
  .catch((error) => {
    console.log("Error when loading files: " + error);
  });

const register = (bot: Telegraf) => {
  bot.on("message", async (ctx: any) => {
    const replyTo = ctx.message.reply_to_message;
    if (replyTo) {
      if (replyTo.from.id == ctx.botInfo.id) {
        rivebot.reply("snazzy", ctx.message.text).then((reply) => {
          ctx.reply(reply);
        });
      }
    }
  });
};

export default { register };
