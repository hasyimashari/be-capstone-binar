const express = require('express')
const { createModule, getAllModule, getDetailModule, updateModule, deleteModule } = require('../controllers/module')

const router = express.Router()

router.post('/admin/modules', createModule)
router.get('/admin/modules', getAllModule)
router.get('/modules/:id', getDetailModule)
router.put('/admin/modules/:id', updateModule)
router.delete('/admin/modules/:id', deleteModule)

module.exports = router
