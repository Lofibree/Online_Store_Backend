const {Type} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')


class TypeController  {
    async createType(req, res) {
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (err) {
            console.log(err)
            return res.json({message: 'Не удалось создать тип'})
        }
    }
    async getType(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async deleteType(req, res) {
        try {
            const {id} = req.params
            const type = Type.destroy({where: {id}})
            return res.json({id: id})
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: 'Не удалось удалить тип'})
        } 
    }
    async editType(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body
            console.log(req.body)
            const type = Type.update({name}, {where: {id}, returning: true})
            return res.json(type)
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: 'Не удалось изменить тип'})
        } 
    }
}


module.exports = new TypeController()