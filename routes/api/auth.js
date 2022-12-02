const express = require("express");
const authControllers = require("../../controllers/auth");
const { userSchema } = require("../../models");
const { validationBody, authenticate, upload } = require("../../middlewares");
const { controllerlWrapper } = require("../../helpers");
const router = express.Router();

router.post("/users/signup", validationBody(userSchema.registerSchema), controllerlWrapper(authControllers.register));
router.get("/users/verify/:verificationToken", controllerlWrapper(authControllers.emailverification));
router.post(
  "/users/verify",
  validationBody(userSchema.verifyEmailSchema),
  controllerlWrapper(authControllers.resendVerifyEmail)
);
router.post("/users/login", validationBody(userSchema.loginSchema), controllerlWrapper(authControllers.login));
router.get("/users/logout", authenticate, controllerlWrapper(authControllers.logout));
router.get("/users/current", authenticate, controllerlWrapper(authControllers.currentUser));
router.patch(
  "/users",
  authenticate,
  validationBody(userSchema.updateUserSubscriptionSchema),
  controllerlWrapper(authControllers.updateUserSubscription)
);
router.patch("/users/avatars", authenticate, upload.single("avatar"), controllerlWrapper(authControllers.userUpdateAvatar));

module.exports = router;
