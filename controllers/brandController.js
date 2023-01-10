const { Brand } = require("../models/models")

class BrandController  {
    async createBrand(req, res) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch(err) {
            console.log(err)
            res.json('Не получилось создать бренд')
        }
    }
    async getAll(req, res) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch(err) {
            console.log(err)
            res.json('Не получилось найти бренды')
        }
    }
    async deleteBrand(req, res) {
        try {
            const {id} = req.params
            const brand = Brand.destroy({where: {id}})
            return res.json({message: id})
        } catch(err) {
            console.log(err)
            res.json('Не получилось удалить бренд')
        }
    }
    async updateBrand(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body
            const brand = Brand.update({name}, {where: {id}, returning: true})
            return res.json(brand)
        } catch(err) {
            console.log(err)
            res.json('Не получилось изменить бренд')
        }
    }
}


module.exports = new BrandController()