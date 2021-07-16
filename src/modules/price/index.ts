import { Context } from "telegraf";
import axios from "axios";
import meta from "./meta";
import cheerio from "cheerio";

const FlipkartPrice = async (ctx: Context, params?: any) => {
  // todo
};

const AmazonPrice = async (ctx: Context, params?: any) => {
  axios
    .get("https://www.amazon.com/s?k=iphone+12+pro", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      },
    })
    .then(({ data }) => {
      const $ = cheerio.load(data);
      console.log("$", $(".a-price-whole").length);
    });
};

export default {
  handler: AmazonPrice,
  match: /^\? (.*)/,
  ...meta,
};
