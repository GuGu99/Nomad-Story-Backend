import Joi from 'joi';
import crypto from 'crypto';
import { user } from '../../models';
import {generateToken} from '../../lib/token'

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

    const hashed = createAndReturnHash();
    const signup_data = {
        user_id,
        username,
        password : hashed.update(password).digest('hex'),
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
        ctx.throw(400, "양식이 맞지 않습니다.", { "err_code": "001" });
        return;
    }
    
    const { user_id, password } = ctx.request.body;
    let findUserId;

    try{
        findUserId = await user.findOne({ where : { user_id } });
    } catch (error) {
        ctx.throw(500, error);
    }

    if (findUserId == null){
        ctx.throw(400, "존재하지 않는 아이디 입니다.", { "err_code" : "003" });
        return;
    }

    const hashedSigninPw = createAndReturnHash()
        .update(password).digest('hex');
    if (findUserId.password != hashedSigninPw){
        ctx.throw(400, "비밀번호가 일치하지 않습니다", {"err_code" : "004"});
        return;
    }

    let token;
    const payload = {
        user_id : findUserId.user_id
    };

    try {
        token = await generateToken(payload);
    } catch (error) {
        ctx.throw(500, error);
    }

    console.log(`로그인 : ${findUserId.user_id}`);
    ctx.body = token;
};