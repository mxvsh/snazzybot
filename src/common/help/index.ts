import { Composer } from "grammy";

const composer = new Composer();

composer.command("help", (ctx) =>
  ctx.reply(`Head over to my [website](https://snzy.in) to get some help.`, {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  })
);

export default composer;
