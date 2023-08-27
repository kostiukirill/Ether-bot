import Telegraf, { Markup } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { db } from "../middleware/createDB";
import { inlineKBHelp } from "../utils/inlineKBHelp.util";

export const actionChooseRole = (role: string, ctx: any, bot: Telegraf<IBotContext>) => { 
    const name =  ctx.session.nameGuest = ctx.update.callback_query?.from?.first_name;
    const id = ctx.update.callback_query?.from?.id
    const guestData = {
        'name': name,
        'id': id,
        'role': role,
        'dateRegister': new Date(),
        'dateUpdate': new Date().getTime(),
    }
    ctx.reply(`Your chose role ${role}. Are you shure?\nIf you're shure, press 'Yes', else choose other role!`,{
        reply_markup: Markup.inlineKeyboard([
            Markup.callbackButton('Yes','yes'),
        ])
    }
    )
    bot.action('yes', async () => {
        if(role === 'user') {
            await db.push(
                `/${ctx.update.callback_query.from?.id}`, 
                {
                    ...guestData,
                    'quanReqs': 5,
                })
            ctx.reply(`Great, ${name}! You're user! You have 5 requests in 24 hours`,inlineKBHelp)

        } else if(role === 'analyst'){
            await db.push(
                `/${ctx.update.callback_query.from?.id}`, 
                {
                    ...guestData,
                    'quanReqs': 20,
                })
            ctx.reply(`Great, ${name}! You're analyst! You have 20 requests in 24 hours`,inlineKBHelp)

        }
})}