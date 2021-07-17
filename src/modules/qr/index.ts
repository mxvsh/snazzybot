import { Context } from "grammy";
import meta from "./meta";

const QR = async (ctx: Context, params?: any) => {
  const { reply_to_message } = ctx.message;
  if (!params && !reply_to_message) {
    ctx.reply("Please reply to a text message or pass some text.");
    return;
  }

  let text = params;
  if (reply_to_message) text = reply_to_message.text;

  if (!text) {
    ctx.reply("No text found.");
    return;
  }

  ctx.api.sendChatAction(ctx.chat.id, "upload_photo");

  ctx.replyWithPhoto(
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`,
    {
      caption: `QR for: ${text}`,
    }
  );
};

export default {
  handler: QR,
  match: /^\?qr\s?(.*)/,
  ...meta,
};
