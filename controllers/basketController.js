const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo, BasketDevice, Basket } = require('../models/models.js')
const ApiError = require('../error/ApiError')

class BasketController {
    async createBasketDevice(req, res, next) {
        try {
            const {id} = req.user
            const deviceId = req.params.id
            console.log(req.user)
            console.log(req.params)
            const [basket, created] = await Basket.findOrCreate({
                where: { userId: id  },
                defaults: {
                    userId: id 
                }
            })
            console.log(basket)
            console.log(created)
            // if (created) {
                const basketDevice = await BasketDevice.create({
                    deviceId: deviceId,
                    basketId: basket.id
                })
                console.log(basketDevice)
                return res.json({message: 'success'})
            // }
        } catch (err) {
            console.log(err)
            next(ApiError.badRequest(err.message))
        }
    }
    // async updateDevice(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         let { name, price, brandId, typeId, info } = req.body
    //         const { img } = req.files
    //         let fileName = uuid.v4() + ".jpg"
    //         img.mv(path.resolve(__dirname, '..', 'static', fileName))
    //         const device = await Device.update({ name, price, brandId, typeId, img: fileName }, { where: { id } })
    //         if (info) {
    //             try {
    //                 info = JSON.parse(info)
    //                 info.forEach(async (i) => {
    //                     console.log(i)
    //                     const _id = i.id
    //                     if (_id) {
    //                         await DeviceInfo.update({
    //                             title: i.title,
    //                             description: i.description,
    //                             deviceId: id
    //                         }, { where: { id } })
    //                     }
    //                     if (!_id) {
    //                         const aInfo = await DeviceInfo.create({
    //                             title: i.title,
    //                             description: i.description,
    //                             deviceId: id
    //                         })
    //                         // console.log(aInfo)
    //                     }
    //                 })

    //             } catch (err) {
    //                 console.log(err)
    //                 next(ApiError.badRequest(err.message))
    //             }
    //         }

    //         return res.json(device)
    //     } catch (err) {
    //         console.log(err)
    //         next(ApiError.badRequest(err.message))
    //     }
    // }
    async getAllBasketDevices(req, res, next) {
        try {
            const { id } = req.user
            const basket = await Basket.findOne({ where: { id } })
            if (basket.id) {
                const basketDevices = await BasketDevice.findAll({ where: { basketId: id } })
                if (basketDevices.length !== 0) {
                    let devices = [];
                    await basketDevices.forEach(async (b) => {
                        const deviceId = b.deviceId
                        const device = await Device.findOne({ where: { id: deviceId } })
                        devices.push(device)
                        if (devices.length === basketDevices.length) {
                            console.log(devices)
                            return res.json(devices)
                        }
                    })
                } else {
                    res.status(500).json({message: 'Нет девайсов в корзине'})
                    // next(ApiError.internal('Нет девайсов в корзине'))
                }
            }
        } catch (err) {
            console.log(err)
            next(ApiError.internal(err.message))
        }
    }
    // async getDevice(req, res) {
    //     try {
    //         const { id } = req.params
    //         const device = await Device.findOne({
    //             where: { id },
    //             include: [{ model: DeviceInfo, as: 'info' }]
    //         })
    //         return res.json(device)
    //     } catch (err) {
    //         console.log(err)
    //         next(ApiError.badRequest(err.message))
    //     }
    // }
    // async deleteDevice(req, res) {
    //     try {
    //         const { id } = req.params
    //         const device = await Device.destroy({ where: { id } })
    //         return res.json(id)
    //     } catch (err) {
    //         console.log(err)
    //         next(ApiError.badRequest(err.message))
    //     }
    // }
    // async deleteDeviceInfo(req, res) {
    //     try {
    //         const { id } = req.params
    //         const deletedInfo = await DeviceInfo.destroy({where: {id}}) 
    //         return res.json(id)
    //     } catch (err) {
    //         console.log(err)
    //         next(ApiError.badRequest(err.message))
    //     }
    // }
    // // async createBasket(req, res) {
    // //     try {
    // //         const 
    // //     } catch (err) {
    // //         console.log(err)
    // //         next(ApiError.badRequest(err.message))
    // //     }
    // // }
}


module.exports = new BasketController()