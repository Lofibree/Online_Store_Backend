const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

// router.post('/', authMiddleware, BasketController.createBasket)
router.post('/device/:id', authMiddleware, BasketController.createBasketDevice)
// router.patch('/:id', checkRoleMiddleware('ADMIN'), DeviceController.updateDevice)
router.get('/', authMiddleware, BasketController.getAllBasketDevices)
// router.get('/:id', DeviceController.getDevice)
// router.delete('/:id', checkRoleMiddleware('ADMIN'), DeviceController.deleteDevice)
// router.delete('/info/:id', checkRoleMiddleware('ADMIN'), DeviceController.deleteDeviceInfo)





module.exports = router