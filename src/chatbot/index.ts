import path from "path";
import RiveScript from "rivescript";
import { Composer } from "grammy";

const rivebot = new RiveScript();
const composer = new Composer();

const initBot = () => {
  rivebot.sortReplies();
};

rivebot
  .loadDirectory(path.join(__dirname, "brain"))
  .then(initBot)
  .catch((error) => {
    console.log("Error when loading files: " + error);
  });

composer.on("message", async (ctx) => {
  const replyTo = ctx.message.reply_to_message;

  if (replyTo) {
    if (replyTo.from.id == ctx.me.id) {
      rivebot.reply(String(ctx.from.id), ctx.message.text).then((reply) => {
        ctx.reply(reply, { reply_to_message_id: ctx.message.message_id });
      });
    }
  }
});

export default composer;
