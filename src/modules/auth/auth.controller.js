import AuthService from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";

const register = catchAsync(async (req, res, next) => {
  const data = await AuthService.register({
    username: req?.body?.username,
    email: req?.body?.email,
    password: req?.body?.password,
    phone: req?.body?.phone
  });
  res.json(data);
});

const login = catchAsync(async (req, res, next) => {
  const data = await AuthService.login({
    email: req?.body?.email,
    password: req?.body?.password
  });
  res.json(data);
});

export default {
  register,
  login
}