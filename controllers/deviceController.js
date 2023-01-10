const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models.js')
const ApiError = require('../error/ApiError')

class DeviceController  {
    async createDevice(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            console.log(req.files)
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                }))
            }

            return res.json(device)
        } catch(err) {
            console.log(err)
            next(ApiError.badRequest(err.message))
        }
    }
    async getAllDevices(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }
    async getDevice(req, res) {
        try {
            const {id} = req.params
            const device = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            })
            return res.json(device)
        } catch (err) {
            console.log(err)
            next(ApiError.badRequest(err.message))
        }
    }
    async deleteDevice(req, res) {
        try {
            const {id} = req.params
            const device = await Device.destroy({where: {id}})
            return res.json(id)
        } catch (err) {
            console.log(err)
            next(ApiError.badRequest(err.message))
        }
    }
}


module.exports = new DeviceController()