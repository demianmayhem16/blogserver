const jwt = require('jsonwebtoken')

module.exports = function (req, res ,next)  {
        const token = req.cookies.token
     
        try {
            const user = jwt.verify(token , process.env.SECRET_KEY)
            req.body.user = user
            next()
        } catch (err) {
            res.clearCookie("token")
            return res.json("user not auth")
        }
}