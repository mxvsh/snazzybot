import { Context } from "telegraf";
import axios from "axios";

const stripAnsi = require("strip-ansi");

import meta from "./meta";

const Response = async (ctx: Context, params?: any) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");

  let q = params.replace(/ /, "+");

  axios
    .get(`https://cheat.sh/${q}`, {
      headers: {
        "user-agent": "curl/7.64.1",
      },
    })
    .then(({ data }) => {
      ctx.telegram.sendDocument(ctx.chat.id, {
        source: Buffer.from(stripAnsi(data)),
        filename: `${q.replace("+", " ")}.txt`,
      });
    });
};

export default {
  handler: Response,
  match: /^\?code (.*)/,
  ...meta,
};
