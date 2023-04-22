const Router = require("express")
const profileController = require("../controllers/profileController")
const router = new Router()
const cookieJwtAuthMiddleware = require("../middleware/cookieJwtAuthMiddleware")

router.get("/", cookieJwtAuthMiddleware, profileController.getUserProfile)
router.post(
  "/update",
  cookieJwtAuthMiddleware,
  profileController.patchProfileImg
)

module.exports = router
