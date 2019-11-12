import Joi from 'joi';
import crypto from 'crypto';
import { user } from '../../models';

import dotenv from 'dotenv';
dotenv.config();

export const Register = async(ctx) => {
    console.log(ctx.request.body);
    const Registeration = Joi.object().keys({
        user_id : Joi.string().alphanum().min(6).max(15).required(),
        username : Joi.string().alphanum().min(2).max(15).required(),
        password : Joi.string().min(6).required(),
        email : Joi.string().email().max(20).required()
    });
    console.log("1");

    const result = Joi.validate(ctx.request.body, Registeration);
    if(result.error) {
        console.log("회원가입 - 올바르지 않은 조이 형식입니다.")
        ctx.status = 400;
        ctx.body = { 
            "error" : "001",
            "message" : "올바르지 않은 조이 형식입니다."
        };
        return;
    }
    console.log("2");
    const idIsExist = await user.findOne({ where : { user_id : ctx.request.body.user_id } });
    if (idIsExist != null){
        console.log("회원가입 - 이미 존재하는 아이디 입니다.");
        ctx.status = 400;
        ctx.body = { 
            "error" : "002", 
            "message" : "이미 존재하는 아이디 입니다."
        };
        return;
    }
    console.log("3");
    const new_pwd = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    
    console.log(ctx.request.body);
    const new_user = await user.create({
        "user_id" : ctx.request.body.user_id,
        "username" : ctx.request.body.username,
        "password" : new_pwd,
        "email" : ctx.request.body.email
    });

    console.log(`회원가입 완료. 아이디 - ${ctx.request.body.user_id}`)
    ctx.status = 200;
    ctx.body = { "id" : new_user.id };
};

export const Test = async(ctx) => {
    console.log(ctx.request.body);
    await user.create({
        user_id : ctx.request.body.user_id,
        username : ctx.request.body.username,
        password : ctx.request.body.password,
        email : ctx.request.body.email
    });
};
