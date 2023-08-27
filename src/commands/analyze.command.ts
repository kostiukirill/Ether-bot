import { ConfigService } from "../config/config.service"
import { convertToxlsx } from "../middleware/convertToxlsx"
import { db } from "../middleware/createDB"
import { MyEtherscanProvider } from "../middleware/wallet"

const configService = new ConfigService()

export const analyzeWallet = async (ctx: any) => {
        const id = ctx.update.message?.from?.id
        if(ctx.update.message?.text?.startsWith('/analyze')) {
                const reqs = await db.getData(`/${id}/quanReqs`)
                const differenceTime = new Date().getTime() - await db.getData(`/${id}/dateUpdate`)
                const daysMs = 86400000;                
                if(reqs === 0 && differenceTime <= daysMs) {
                    ctx.reply(`Sorry! \nYou have exhausted all your requests. \nCould you come back in a ${Math.floor((daysMs - differenceTime)/(1000*60*60))} hours ${Math.round((daysMs - differenceTime)/(1000*60)%60)} minutes`)
                } else if(reqs > 0){
                    const mesArr = ctx.update.message?.text?.split(' ');
                    if(mesArr && mesArr[0] === '/analyze' && mesArr[mesArr.length - 1] === 'eth.' && mesArr.length === 3) {
                        const address = mesArr[1];
                        await new MyEtherscanProvider('mainnet', configService.get('APIKEY'))
                        .getHistory(address)
                        .then((history: []) => 
                        history.filter(
                            (his: { to: string; }) => 
                            his.to.toLowerCase() === configService.get('UNISWAPV2').toLowerCase() 
                            || his.to.toLowerCase() === configService.get('UNISWAPV3').toLowerCase()))
                            .then(history => 
                                convertToxlsx(history, configService.get('UNISWAPV2'), configService.get('UNISWAPV3')))
                                ctx.replyWithDocument({source: 'TransactionsData.xlsx'})
                                await db.push(`/${id}/quanReqs`, reqs-1)
                                ctx.reply(`Thanks! \n You have ${reqs-1} requests`)
                            }
                } else if (differenceTime > daysMs) {
                    await db.push(`/${id}/quanReqs`, 5 ),
                    await db.push(`/${id}/dateUpdate`, new Date().getTime())
                }

            }

}