const Router = require('express')
const commentController = require('../controllers/commentController')
const router = new Router()
const cookieAuthMiddleware = require("../middleware/cookieJwtAuthMiddleware")

router.get('/', cookieAuthMiddleware, commentController.getAllComments )
router.get('/:postId', commentController.getAllPostComments )
router.get('/:name', cookieAuthMiddleware, commentController.getAllUserComments )

router.post('/auth/:postId', cookieAuthMiddleware , commentController.createAuthComment )
router.post('/pub/:postId', commentController.createPubComment )

router.patch('/:id', commentController.approveComment )
router.delete('/:id', commentController.deleteComment )
router.delete('/:postId', commentController.deleteCommentByPostId )
module.exports = router
