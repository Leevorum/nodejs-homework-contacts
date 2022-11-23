const { userSchema } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;

  try {
    const result = await userSchema.User.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ subscription: result.subscription });
  } catch (error) {
    throw RequestError(400, error.message);
  }
};

module.exports = updateUserSubscription;
