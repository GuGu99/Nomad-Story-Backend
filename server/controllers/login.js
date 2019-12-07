import {regFormIsVaild, loginFormIsVaild} from '../middlewares/isCorrectForm';

class LoginController {
  async register(ctx){
    const checkRegForm = regFormIsVaild(ctx.request.body);
    if (checkRegForm.error){
      console.error(checkRegForm.error.details);
      ctx.body = checkRegForm.error.details;
    }
    ctx.body = "기존 아이디 있는지 체크";
  }

  async login(ctx){
    const checkLoginForm = loginFormIsVaild(ctx.request.body);
    if (checkLoginForm.error){
      console.error(checkLoginForm.error.details);
      ctx.body = checkLoginForm.error.details;
    }
    ctx.body = "기존 아이디 있는지 체크";
  }
}

export default new LoginController();
