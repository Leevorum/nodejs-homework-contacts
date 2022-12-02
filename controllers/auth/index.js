const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const updateUserSubscription = require("./updateUserSubscription");
const userUpdateAvatar = require("./userUpdateAvatar");
const emailverification = require("./emailverification");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateUserSubscription,
  userUpdateAvatar,
  emailverification,
  resendVerifyEmail
};
