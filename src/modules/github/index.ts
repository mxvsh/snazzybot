import { Context } from "telegraf";
import axios from "axios";

import meta from "./meta";

const Answer = async (ctx: Context, params?: any) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");

  await axios
    .get(`https://api.github.com/users/${params}`)
    .then(async ({ data }) => {
      await ctx.telegram.sendPhoto(ctx.chat.id, data.avatar_url, {
        caption:
          `<b> ${data.name}</b>\n\n` +
          `👤 Username: ${data.name}\n` +
          `📍 Location: ${data.location}\n` +
          `📚 Repos: ${data.public_repos}\n` +
          `🫂 Followers: ${data.followers}\n` +
          `📅 Joined: ${data.created_at}`,
        parse_mode: "HTML",
      });
    })
    .catch((err) => {
      console.log("err", err);
      ctx.reply("Not found.");
    });
};

export default {
  handler: Answer,
  match: /^\?gh (.*)/,
  ...meta,
};
