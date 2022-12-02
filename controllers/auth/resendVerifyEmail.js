const { userSchema } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = userSchema.User.findOne({ email: email });

  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verify) {
    throw RequestError(400, "User alredy verify");
  }

  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/api/auth/users/verify/${
      user.verificationToken
    }" target="_blank">Click to verify your email</a>`
  };
  await sendEmail(mail);
  res.json({
    message: "Email verify resend"
  });
};

module.exports = resendVerifyEmail;
