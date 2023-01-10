const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware('ADMIN'), TypeController.createType)
router.patch('/:id', checkRoleMiddleware('ADMIN'), TypeController.editType)
router.delete('/:id', checkRoleMiddleware('ADMIN'), TypeController.deleteType)
router.get('/', TypeController.getType)





module.exports = router