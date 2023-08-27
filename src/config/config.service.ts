import { DotenvParseOutput, config } from "dotenv";
import { IconfigService } from "./config.interface";

export class ConfigService implements IconfigService {
    private config: DotenvParseOutput;
    
    constructor() {
        const {error, parsed} = config()
        if(error) {
            throw new Error(".env file isn't found")
        }
        if(!parsed) {
            throw new Error(".env file is empty")
        }
        this.config = parsed
    }

    get(key: string): string {
        const res = this.config[key];
        if(!res) {
            throw new Error("This key isn't found")
        } else {
            return res
        }
    }
}