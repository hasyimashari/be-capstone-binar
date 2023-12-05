const express = require('express')

const {
  createModule,
  getAllModule,
  getDetailModule,
  updateModule,
  deleteModule
} = require('../controllers/module')
const { isChapterExistInPayload } = require('../middleware/chapter')
const { isModuleExist } = require('../middleware/module')

const router = express.Router()

router.post('/admin/modules', isChapterExistInPayload, createModule)
router.get('/admin/modules', getAllModule)
router.get('/modules/:id', isModuleExist, getDetailModule)
router.put('/admin/modules/:id', isModuleExist, isChapterExistInPayload, updateModule)
router.delete('/admin/modules/:id', isModuleExist, deleteModule)

module.exports = router
