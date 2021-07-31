import { Composer } from "grammy";

// Private chat commands
import start from "./start";
import help from "./help";

const composer = new Composer();

composer
  .filter((ctx) => ctx.chat?.type == "private")
  .use(start)
  .use(help);

export default composer;
