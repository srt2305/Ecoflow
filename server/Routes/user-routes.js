const router = require("../utils/router-instance");
const {
  userLogin,
  handleVerifyAuth,
  handleAddNewUser,
  userLogout,
  updateNaming,
} = require("../controllers/user-controllers");
const { verifyAuthToken } = require("../middlewares/auth-middleware");

router.post("/login", userLogin);
router.post("/logout", userLogout);
router.post("/add-user", handleAddNewUser);
router.post("/verify", verifyAuthToken, handleVerifyAuth);
router.post("/send-update", updateNaming);

module.exports = router;
