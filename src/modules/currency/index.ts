import axios from "axios";
import { Context } from "telegraf";
import meta from "./meta";

const Currency = async (ctx: Context, params?: any) => {
  if (!params) return;
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");

  // match from and to from text
  try {
    const [, from, to, amount] = params.match(/(\w+) (\w+) (\d+)/);

    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then(({ data }) => {
        const rates = data[from];

        if (rates) {
          const rate = rates[to];

          if (rate) {
            ctx.reply(
              `${amount} ${from.toUpperCase()} in ${to.toUpperCase()}\n\n<code>${new Intl.NumberFormat(
                "en-US",
                { style: "currency", currency: to }
              ).format(Number((rate * amount).toFixed(2)))}</code>`,
              {
                parse_mode: "HTML",
              }
            );
            return;
          }
        }

        ctx.reply(`Not found.`);
      });
  } catch (e) {}
};

export default {
  handler: Currency,
  match: /^\?cr (.*)/,
  ...meta,
};
