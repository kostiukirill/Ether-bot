import { Markup } from "telegraf";

export const inlineKBHelp = {
    reply_markup: Markup.inlineKeyboard([
        Markup.callbackButton('Help','help'),
    ])
}