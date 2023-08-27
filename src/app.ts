import { Telegraf} from "telegraf";
import { ConfigService } from './config/config.service';
import { IBotContext } from "./context/context.interface";
import LocalSession from "telegraf-session-local";
import { actionChooseRole } from "./commands/chooseRole.command";
import { inlineKBHelp } from "./utils/inlineKBHelp.util";
import { analyzeWallet } from "./commands/analyze.command";
import { startBot } from "./commands/start.command";


const configService = new ConfigService()
const bot = new Telegraf<IBotContext>(configService.get('TOKEN'));
bot.use(new LocalSession({ database: 'sessions.json' }).middleware())

bot.start((ctx) => {
    startBot(ctx)
})
bot.action('user', (ctx) => {
    actionChooseRole('user', ctx, bot)
})

bot.action('analyst', (ctx) => {
    actionChooseRole('analyst', ctx, bot)
})

bot.on('text', (ctx) => {
    analyzeWallet(ctx)
})

bot.action('help', async (ctx) => {
    console.log('Help requested', ctx)
    ctx.reply("This bot analyzes your Wallet, and return your transaction history in .csv file. \nCommands: \n/start: To starting bot. \n/analyze <your wallet number> eth.: To return your transaction history in .csv file. \nPress 'Help': To return message with information of bot's functional and command list.", inlineKBHelp)
})




bot.launch()



