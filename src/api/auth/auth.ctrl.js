import Joi from 'joi';
import crypto from 'crypto';
import { user } from '../../models';

import dotenv from 'dotenv';
dotenv.config();

const signupVaildate = (userParams) => { 
    return Joi.object({
        user_id : Joi.string()
            .required()
            .alphanum()
            .min(6)
            .max(15),
        username : Joi.string()
            .required()
            .alphanum()
            .min(2)
            .max(15),
        password : Joi.string()
            .required()
            .min(6),
        email : Joi.string()
            .required()
            .email(),
    }).validate(userParams);
}

// POST api/auth/signup
export const signup = async(ctx) => {
    const signupFormCheck = signupVaildate(...ctx.request.body);
    if(signupFormCheck.error) {
        ctx.throw(400, '양식이 맞지 않습니다.', { "err_code": "001" });
        return;
    }

    const {user_id, username, password, email} = ctx.request.body;
    let idIsExist;

    try{
        idIsExist = await user.findOne({ where : { user_id } });
    }catch(error){
        ctx.throw(500, error);
    }

    if (idIsExist != null){
        ctx.throw(409, '이미 존재하는 아이디입니다.', { "err_code": "002" });
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

    console.log(`회원가입 완료. 아이디 - ${new_user.id}`);
    ctx.status = 200;
    ctx.body = { "id" : new_user.id };
};


// POST api/auth/signin
export const signin = async(ctx) => {
    const LoginInput = Joi.object().keys({
        user_id : Joi.string()
            .alphanum()
            .min(6)
            .max(15)
            .required(),
        password : Joi.string()
            .min(6)
            .required()
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
        return;
    }

    const hashedPassword = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    if (idFound.password != hashedPassword){
        console.log("로그인 - 패스워드가 틀렸습니다.");
        ctx.status = 400;
        ctx.body = {
            "error" : "004",
            "meesage" : "패스워드가 틀렸습니다."
        }
        return;
    }

    console.log("로그인 진행");
    ctx.body = "로그인";
    // 토큰 추가

};