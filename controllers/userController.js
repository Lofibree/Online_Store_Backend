const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models.js')
const jwt = require('jsonwebtoken')


const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '30d' }
    )
}


class UserController  {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            } 
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, role, password: hashPassword })
            const basket = await Basket.create({ userId: user.id })
            const token = generateJWT(user.id, email, user.role)
            return res.json({token: token, role: user.role})
        } catch(err) {
            console.log(err)
            return res.send('Не удалось зарегистрироваться')
        }
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal('Неверный логин или пароль'))
        }
        let comparePasswords = bcrypt.compareSync(password, user.password)
        if (!comparePasswords) {
            return next(ApiError.internal('Неверный логин или пароль'))
        }
        const token = generateJWT(user.id, email, user.role)
        return res.json({token, role: user.role})
    }
    async getMe(req, res, next) {
        try {
            // console.log(req.user)
            const token = generateJWT(req.user.id, req.user.email, req.user.role)
            return res.json({ token, role: req.user.role })
        } catch (err) {
            console.log(err)
            return res.json({message: 'Не авторизован'})
        }
    }
    async logout(req, res, next) {
        try {
            // console.log(req.user)
            // const token = generateJWT(req.user.id, req.user.email, req.user.role)

            return res.json({ success: true })
        } catch (err) {
            console.log(err)
            return res.json({message: 'Не удалось выйти'})
        }
    }
}

 
module.exports = new UserController()