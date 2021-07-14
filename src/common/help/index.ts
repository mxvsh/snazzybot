import { Context } from "telegraf";

export default (ctx: Context) => {
  if (ctx.chat.type === "private") {
    ctx.reply(`Head over to my [website](https://snzy.in) to get some help.`, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
    return;
  }
};
