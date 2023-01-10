const Router = require('express')
const router = new Router()
const DeviceController = require('../controllers/deviceController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware('ADMIN'), DeviceController.createDevice)
router.get('/', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getDevice)
router.delete('/:id', checkRoleMiddleware('ADMIN'), DeviceController.deleteDevice)





module.exports = router