const { userSchema } = require("../../models/");
const { RequestError } = require("../../helpers");

const emailverification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await userSchema.User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "Not found verification token");
  }

  await userSchema.User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
  res.json({
    message: "Email verify success"
  });
};

module.exports = emailverification;
