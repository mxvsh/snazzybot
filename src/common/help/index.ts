import { Composer } from "grammy";

const composer = new Composer();

import glob from "glob";
import path from "path";

const modulesFolder = path.join(__dirname, "../../modules");

let ModuleHelp = {};

glob(modulesFolder + "/**/meta.*", (er, files) => {
  files.map((file) => {
    let mod = require(file);
    if (!mod.default) return;
    mod = mod.default;

    ModuleHelp[mod.name] = mod;

    // ModuleHelp[d.name] = d.defaults.help;
  });
});

composer.command("help", (ctx) => {
  let message = "";

  if (ctx.chat.type === "private") {
    Object.keys(ModuleHelp).map((name) => {
      const description = ModuleHelp[name].description;
      const usage = ModuleHelp[name].usage;

      message += `*${name}*\n`;
      message += `_${description}_\n`;
      message += `Usage:  ${usage.map((i) => "`" + i + "`").join(" ")}\n\n`;
    });

    ctx.reply(message, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
    return;
  }
});

export default composer;
