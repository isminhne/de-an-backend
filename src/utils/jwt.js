import jwt from "jsonwebtoken";
import config from "../../config.js";
import {AuthenticationError} from "../exception/errorResponse.js";

export const createJwt = (payload, lifetime) => {
  const created = Date.now();
  const expired = created + lifetime;

  return { ...payload, created, expired };
}

export const createJwtToken = (payload, lifetime) => jwt.sign(createJwt(payload, lifetime), config.SECRET_KEY_JWT);

export const verifyJwt = token => new Promise((resolve, reject) => {
  jwt.verify(token, config.SECRET_KEY_JWT, (err, decoded) => {
    if (err) return reject(err);

    if (decoded.expired < Date.now()) {
      console.log(decoded.expired, Date.now());
      reject(new AuthenticationError('Token expired'));
    }

    return resolve(decoded);
  });
});