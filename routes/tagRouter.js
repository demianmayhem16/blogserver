const Router = require('express')
const tagController = require('../controllers/tagController')
const router = new Router()
const cookieAuthMiddleware = require("../middleware/cookieJwtAuthMiddleware")

router.get('/', cookieAuthMiddleware, tagController.getAll )
router.post('/add', cookieAuthMiddleware,  tagController.create )
router.delete('/:id', cookieAuthMiddleware, tagController.deleteOne )
router.patch('/:id/visible', tagController.makeVisible )

module.exports = router
