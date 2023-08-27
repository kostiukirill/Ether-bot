import { Markup } from "telegraf"
import { db } from "../middleware/createDB"
import { inlineKBHelp } from "../utils/inlineKBHelp.util"

export const startBot = async (ctx: any) => {
    const id = ctx.update.message?.from?.id
    const name = ctx.update.message?.from?.first_name
    if(id in await db.getData('/')) {
        const differenceTime = new Date().getTime() - await db.getData(`/${id}/dateUpdate`)
        const daysMs = 86400000;                
        differenceTime > daysMs && (
            await db.push(`/${id}/quanReqs`, 5 ),
            await db.push(`/${id}/dateUpdate`, new Date().getTime())
        )
    }
    await db.getData('/')
        .then(async res => {
        if(id && id in res) {
            ctx.reply(`Sup, ${res[id].name}!\nI know, your role is ${res[id].role}.\nYour request limit for today is: ${res[id].quanReqs} requests`, inlineKBHelp)
        } else {
            ctx.reply(`Sup, ${name}! I'm Ethereum bot. Please, choose your role`, {
                reply_markup: Markup.inlineKeyboard([
                    Markup.callbackButton('User','user'),
                    Markup.callbackButton('Analyst','analyst'),
                ])
            })
        }
    })
}
// 1693165877348