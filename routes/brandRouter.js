const Router = require('express')
const router = new Router()
const BrandController = require('../controllers/brandController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRoleMiddleware('ADMIN'), BrandController.createBrand)
router.patch('/:id', checkRoleMiddleware('ADMIN'), BrandController.updateBrand)
router.delete('/:id', checkRoleMiddleware('ADMIN'), BrandController.deleteBrand)
router.get('/', BrandController.getAll)





module.exports = router