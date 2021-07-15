import { Context } from "telegraf";
import { spawn } from "child_process";

import meta from "./meta";

const Response = async (ctx: Context, params?: any) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");

  const request = spawn("curl", [`cheat.sh/${params.replace(/ /, "+")}`]);
  request.stdout.on("data", (data) => {
    const response = data.toString();
    ctx.reply(response || "Not found.");
  });
};

export default {
  handler: Response,
  match: /^\?code (.*)/,
  ...meta,
};
