import axios from "axios";
import { Context } from "telegraf";
import meta from "./meta";

const Unsplash = async (ctx: Context, params?: any) => {
  const { UNSPLASH: CLIENT_ID } = process.env;
  if (!params) return;

  ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");

  axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${params}&client_id=${CLIENT_ID}`
    )
    .then(({ data }) => {
      if (!data) return;

      const { results } = data;

      if (results.length == 0) {
        ctx.reply(`Not found.`);
        return;
      }
      const randomResult = results[Math.floor(Math.random() * results.length)];
     

      ctx.replyWithPhoto({ url: randomResult.urls.regular });
    })
    .catch(() => {
      ctx.reply(`Error occurred.`);
    });
};

export default {
  handler: Unsplash,
  match: /^\?img (.*)/,
  ...meta,
};
