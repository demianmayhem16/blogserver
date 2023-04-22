const Router = require('express')
const router = new Router()
const postRouter = require('./postRouter')
const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const commentRouter = require('./commentRouter')
const tagRouter = require('./tagRouter')

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/profile', profileRouter )
router.use('/comment', commentRouter )
router.use('/tag', tagRouter)
module.exports = router
