const multer = require("multer");
const router = require("../utils/router-instance");
const {
  giveImageResponse,
  giveTextResponse,
} = require("../controllers/user-controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/handle-text", giveTextResponse);
router.post("/handle-image", upload.single("image"), giveImageResponse);

module.exports = router;
