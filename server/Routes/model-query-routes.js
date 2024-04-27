const router = require("../utils/router-instance");
const {
  giveImageResponse,
  giveTextResponse,
} = require("../controllers/user-controllers");

router.post("/login", giveTextResponse);
router.post("/logout", giveImageResponse);

module.exports = router;
