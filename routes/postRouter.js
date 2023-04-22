const Router = require("express")
const router = new Router()
const postController = require("../controllers/postController")
const cookieAuthMiddleware = require("../middleware/cookieJwtAuthMiddleware")

router.get("/", cookieAuthMiddleware, postController.getAll)
router.get("/pub", postController.getAll)
router.post("/add", cookieAuthMiddleware, postController.create)

router.patch("/:id/recommend",  postController.toggleRecommend)
router.delete("/:id", cookieAuthMiddleware, postController.deleteOne)

module.exports = router
