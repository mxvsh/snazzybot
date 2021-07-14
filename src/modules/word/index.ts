import { Context } from "telegraf";
import meta from "./meta";

import * as ud from "urban-dictionary";

const Answer = async (ctx: Context, params?: any) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");
  let answer = "";

  await ud
    .define(params)
    .then((results) => {
      const totalAnswers = results.length;
      const randomIndex = Math.floor(Math.random() * totalAnswers);

      const result = results[randomIndex];

      if (result) {
        answer = result.definition;
      }
    })
    .catch((error) => {
      answer = `${error.message}`;
    });

  ctx.reply(answer);
};

export default {
  handler: Answer,
  match: /^\? (.*)/,
  ...meta,
};
