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
};

const signinVaildate = (userParams) => { 
    return Joi.object({
        user_id : Joi.string()
            .alphanum()
            .min(6)
            .max(15)
            .required(),
        password : Joi.string()
            .min(6)
            .required()
    }).validate(userParams);
};

const createAndReturnHash = () =>{
    return crypto.createHmac('sha256', process.env.Password_KEY);
};

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

    const hashed_pw = createAndReturnHash();
    const signup_data = {
        user_id,
        username,
        password : hashed_pw.update(password).digest('hex'),
        email
    }
    
    let new_user;
    try{
        new_user = await user.create(signup_data);
    } catch (error) {
        ctx.throw(500, error);
    } 

    console.log(`회원가입 : ${signup_data.user_id}`);
    ctx.body = new_user;
};


// POST api/auth/signin
export const signin = async(ctx) => {
    const signinFormCheck = signinVaildate(...ctx.request.body);
    if (signinFormCheck.error){
        ctx.throw(400, '양식이 맞지 않습니다.', { "err_code": "001" });
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
    ctx.body = "로그인 완료";
    // 토큰 추가

};