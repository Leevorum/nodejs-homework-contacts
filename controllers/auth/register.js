const bcrypt = require("bcryptjs");
const { userSchema } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const registerUser = await userSchema.User.create({ email, password: hashPassword, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/api/auth/users/verify/${verificationToken}" target="_blank">Click to verify your email</a>`
  };
  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: registerUser.email,
      subscription: registerUser.subscription
    }
  });
};

module.exports = register;
