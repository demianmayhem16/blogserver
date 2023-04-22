const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Profile} = require('../models/models')

const generateJwt = (id, email, name , role) => {
    return jwt.sign(
        {id, email , name , role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, name,  password, role, remember} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('incorrect email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('user with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email,  password: hashPassword , name, role ,})
        await Profile.create({userId: user.id, email: user.email, role: user.role, name: user.name})  
        // login below
        let token
        if (remember) {
            token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: "72h"})
        } else {
            token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: "1h"})
        }
        res.cookie("token", token, {})
        return res.json('logged')
      
    }

    async login(req, res, next) {
        const {email, password, remember} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('user not found'))
        }
        let comparePassword = await bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('incorrect password'))
        }
        let token
        if (remember) {
            token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: "72h"})
        } else {
            token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: "1h"})
        }
        // const token = generateJwt(user.id, user.email, user.name, user.role )
        res.cookie("token", token, {
            // httpOnly: true,
            // secure: true
        })
        return res.json('logged')

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
