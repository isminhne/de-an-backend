import User from "../../models/user.js";
import {BadRequestError} from "../../exception/errorResponse.js";
import {createJwtToken} from "../../utils/jwt.js";
import {TTL_TOKEN} from "../../constants/auth.js";

const register = async ({
  username,
  email,
  password,
  phone
}) => {
  if (!username || !email || !password) {
    throw new BadRequestError('Missing required fields');
  }

  return await User.createUser({
    username,
    email,
    password,
    phone
  });
}

const login = async ({
  email,
  password
}) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new BadRequestError('User not found');
  }

  const validPassword = await user.verifyPassword(password);
  if (!validPassword) {
    throw new BadRequestError('Invalid password');
  }

  return {
    email: user.email,
    token: createJwtToken({email: user.email, role: user.role}, TTL_TOKEN)
  }
}

export default {
  register,
  login
}