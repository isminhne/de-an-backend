import {ExtractJwt} from "passport-jwt";
import {AuthenticationError} from "../exception/errorResponse.js";
import {verifyJwt} from "../utils/jwt.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.js";

export const userMiddleware = catchAsync(async (req, res, next) => {
  try {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!jwt) {
      throw new AuthenticationError('Token not found');
    }

    const { email } = await verifyJwt(jwt);
    const user = await User.findOne({email}).select('-password -__v -createdAt -updatedAt');
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    req.user = user;

    next();
  } catch (e) {
    throw new AuthenticationError(e.message);
  }
})

export const adminMiddleware = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new AuthenticationError('Unauthorized');
  }

  next();
});