const { Router } = require("express");
const { register, verifyEmail, verifyOtp, login, changePassword, forgotPassword, resetPassword, idToEmail, profile, editProfile } = require("../controller/auth_controller");
const { verifyUser } = require("../middleware/verify_user");

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail)
router.post("/verify-otp", verifyOtp)
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/id-to-email", idToEmail);
router.post("/change-password", verifyUser, changePassword);
router.get("/profile", verifyUser, profile);
router.post("/edit-profile", verifyUser, editProfile);

module.exports = router;