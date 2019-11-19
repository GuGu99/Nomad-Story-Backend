import Joi from 'joi';
import crypto from 'crypto';
import { user } from '../../models';

import dotenv from 'dotenv';
import { changeExt } from 'upath';
dotenv.config();

export const Register = async(ctx) => {
    console.log(ctx.request.body);
    const Registeration = Joi.object().keys({
        user_id : Joi.string().alphanum().min(6).max(15).required(),
        username : Joi.string().alphanum().min(2).max(15).required(),
        password : Joi.string().min(6).required(),
        email : Joi.string().email().max(20).required()
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
    const idIsExist = await user.findOne({ where : { user_id : ctx.request.body.user_id } });
    if (idIsExist != null){
        console.log("회원가입 - 이미 존재하는 아이디 입니다.");
        ctx.status = 409;
        ctx.body = { 
            "error" : "002", 
            "message" : "이미 존재하는 아이디 입니다."
        };
        return;
    }
    const new_pwd = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    
    console.log(ctx.request.body);
    const new_user = await user.create({
        "user_id" : ctx.request.body.user_id,
        "username" : ctx.request.body.username,
        "password" : new_pwd,
        "email" : ctx.request.body.email
    });

    console.log(`회원가입 완료. 아이디 - ${new_user.id}`)
    ctx.status = 200;
    ctx.body = { "id" : new_user.id };
};



export const Login = async(ctx) => {
    const LoginInput = Joi.object().keys({
        user_id : Joi.string().alphanum().min(6).max(15).required(),
        password : Joi.string().min(6).required()
    });

    const LoginResult = Joi.validate(ctx.request.body, LoginInput);
    if (LoginResult.error){
        console.log("로그인 - 올바르지 않은 조이 형식입니다.")
        ctx.status = 400;
        ctx.body = { 
            "error" : "001",
            "message" : "올바르지 않은 조이 형식입니다."
        };
        return;
    }
    
    const idFound = await user.findOne({ where : {user_id : ctx.request.body.user_id}});
    if (idFound == null){
        console.log("로그인 - 존재하지 않는 아이디 입니다.");
        ctx.status = 400;
        ctx.body = {
            "error" : "003",
            "message" : "존재하지 않는 아이디 입니다."
        };
    }

    // Login API에서 Password 토큰으로 로그인 요청
    // 사용자 입력 -> 입력한 패스워드를 토큰화 -> 토큰된 암호와 DB암호 비교 -> 로그인 요청

    const hashedPassword = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    const dbPassword = await user.findOne(password, { where : {password : hashedPassword}});
    
    console.log(dbPassword);
    // if (hashedPassword != dbPassword){
    //     console.log("로그인 - 패스워드가 틀렸습니다.");
    //     ctx.status = 400;
    //     ctx.body = {
    //         "error" : "004",
    //         "meesage" : "패스워드가 틀렸습니다."
    //     }
    // }
    // console.log("로그인 진행");

    
};
