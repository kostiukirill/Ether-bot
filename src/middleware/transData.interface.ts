import { IContent, IJsonSheet } from "json-as-xlsx"

export interface TransDataType {
    blockNumber:string,
    timeStamp:string,
    hash:string,
    nonce:string,
    blockHash:string,
    transactionIndex:string,
    from:string,
    to:string,
    value:string,
    gas:string,
    gasPrice:string,
    isError:string,
    txreceipt_status:string,
    input:string,
    contractAddress:string,
    cumulativeGasUsed:string,
    gasUsed:string,
    confirmations:string,
    methodId:string,
    functionName:string
}

export interface DataToxlsxColumnType {
    label: string
    value: string
}

export interface DataToxlsxContentType extends IContent {
    coinA: string,
    from:string,
    coinB:string,
    to:string,
    timeStamp:string,
    contractAddress:string,
    typeDex:string,
}

export interface DataToxlsxType extends IJsonSheet {
    sheet: string,
    columns: DataToxlsxColumnType[],
    content: DataToxlsxContentType[]
    }
