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
        let answerParts = [];

        result.definition.split(" ").forEach((part) => {
          answerParts.push(part.replace(/\[(.+)\]/g, `$1`));
        });

        answer = answerParts.join(" ");
      }
    })
    .catch((error) => {
      answer = `${error.message}`;
    });

  ctx.reply(answer, { parse_mode: "HTML", disable_web_page_preview: true });
};

export default {
  handler: Answer,
  match: /^\? (.*)/,
  ...meta,
};
