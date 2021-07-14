import axios from "axios";
import cheerio from "cheerio";
import meta from "./meta";

const Answer = async (ctx, params?) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");

  const { text } = ctx.message;
  let answer = "Not found.";

  // get result from google
  await axios
    .get(`https://google.com/search?q=${text}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        referer: "https://www.google.com/",
      },
    })
    .then(({ data }) => {
      const classes = ["kno-rdesc"]; // more to add

      const $ = cheerio.load(data);
      for (let _class of classes) {
        const text = $(`.${_class}`).text();
        answer = text;
      }
    })
    .catch((err) => {
      console.log(err);
      answer = "Not found.";
    });

  ctx.reply(answer);
};

export default {
  handler: Answer,
  match: /^(what is|who is|what\'s|who\'s) (.*)/,
  ...meta,
};
