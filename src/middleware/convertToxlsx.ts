import xlsx from "json-as-xlsx";
import { DataToxlsxType, TransDataType } from './transData.interface';

export const convertToxlsx = (data: TransDataType[], uniswapV2: string, uniswapV3: string) => {
    console.log(data)
    const tableData: DataToxlsxType[] = [
        {
            sheet: 'Transactions',
            columns: [
                {label: 'Tiker of coin A', value: 'coinA'},
                {label: 'Adress coin A', value: 'from'},
                {label: 'Tiker of coin B', value: 'coinB'},
                {label: 'Adress coin B', value: 'to'},
                {label: 'Date', value: 'timeStamp'},
                {label: 'Adress contract', value: 'contractAddress'},
                {label: 'DEX type', value: 'typeDex'}
            ],
            content: []
        }]

    
    data.map(trans => {
        const data = {
            coinA: 'ETH',
            from: trans.from,
            coinB: 'ETH',
            to: trans.to,
            timeStamp: `${new Date(parseInt(`${trans.timeStamp}000`))}`,
            contractAddress: trans.contractAddress,
            typeDex: trans.to.toLowerCase() == uniswapV2.toLowerCase() ? 'UniswapV2' : trans.to.toLowerCase() == uniswapV3.toLowerCase() ? 'UniswapV3': 'unknown',
        }

        tableData[0].content.push(data)
    })
    let settings = {
        fileName: "TransactionsData",
        extraLength: 7,
        writeMode: "writeFile",
        writeOptions: {},
        RTL: true,
      }
    
      let callback = function () {
        console.log("Download complete:")
      }
      
      xlsx(tableData, settings, callback)
}
