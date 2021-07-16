import { Composer } from "grammy";

const composer = new Composer();

composer.command("start", (ctx) => {
  ctx.reply(
    `Hey ${ctx.from.first_name}, I am Snazzy. I'm here to provide you utility commands for your groups. You can also try me in private message. Here are few examples. You can ask me a meaning of any word by simply sending \`? javascript\`.\n\nLearn more about me on my website: https://snazzybot.in.`,
    { parse_mode: "Markdown" }
  );
});

export default composer;
