import { user } from "../../models";

import dotenv from 'dotenv';
dotenv.config;

export const ping = async(ctx) =>{
    ctx.body = "pong";
};

