const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization
        // .split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' })
        }
        await jwt.verify(token, 'secret_yyyy', (err, decoded) => {
            if (err) return res.status(402).send(err)
            req.user = decoded
            next()
        })
    } catch (err) {
        res.status(401).json({ message: 'Не авторизован' })
    }
}