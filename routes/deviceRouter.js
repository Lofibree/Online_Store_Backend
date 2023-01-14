const Router = require('express')
const router = new Router()
const DeviceController = require('../controllers/deviceController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware('ADMIN'), DeviceController.createDevice)
router.patch('/:id', checkRoleMiddleware('ADMIN'), DeviceController.updateDevice)
router.get('/', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getDevice)
router.delete('/:id', checkRoleMiddleware('ADMIN'), DeviceController.deleteDevice)
router.delete('/info/:id', checkRoleMiddleware('ADMIN'), DeviceController.deleteDeviceInfo)





module.exports = router