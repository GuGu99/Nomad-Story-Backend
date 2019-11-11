import Joi from 'joi';
import { user } from '../../models';

import dotenv from 'dotenv';
dotenv.config;

export const Register = async(ctx) => {
    const Registeration = Joi.object().keys({
        id : Joi.string().alphanum().min(5).max(20).required(),
        username : Joi.string().alphanum().min(2).max(20).required(),
        password : Joi.string().min(6).max(25).required(),
        email : Joi.string().email().required()
    });

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

    const dataIsExist = user.findOne({
        where : { id }
    });

    if (dataIsExist != Null){
        console.log("회원가입 - 이미 존재하는 아이디 입니다.");
        ctx.status = 400;
        ctx.body = { 
            "error" : "002", 
            "message" : "이미 존재하는 아이디 입니다."
        };
        return;
    }

    const id = ctx.request.body.id;
    const new_pwd = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    
    const new_user = await user.create({
        "id" : id,
        "username" : ctx.request.body.username,
        "password" : new_pwd,
        "email" : ctx.request.body.email
    });

    console.log(`회원가입 완료. 아이디 - ${id}`)
    ctx.status = 200;
    ctx.body = { "id" : new_user.id };
}
