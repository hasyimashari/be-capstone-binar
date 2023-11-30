const express = require('express')
const { createModule, getAllModule, getDetailModule } = require('../controllers/module')

const router = express.Router()

router.post('/admin/modules', createModule)
router.get('/admin/modules', getAllModule)
router.get('/modules/:id', getDetailModule)

module.exports = router
