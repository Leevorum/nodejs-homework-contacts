const jwt = require("jsonwebtoken");
const { userSchema } = require("../models");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401, "Unauthorized"));
  }
  if (!token) {
    next(RequestError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await userSchema.User.findById(id);
    if (!user || !user.token) {
      next(RequestError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authenticate;
