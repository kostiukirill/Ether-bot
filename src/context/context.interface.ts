import { Context} from 'telegraf';

export interface SessionData {
    idGuest?: number;
    nameGuest?: string;
    roleGuest?: 'User' | 'Analyst';
    quanReqs?: 5 | 20;
}

export interface IBotContext extends Context {
    session: SessionData
}