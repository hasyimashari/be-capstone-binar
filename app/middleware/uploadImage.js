const cloudinary = require('../../cloudinary.js')
const multer = require('multer')

// Upload to storage multer
const storage = multer.memoryStorage()
const uploadStorage = multer({ storage }).single('photo')

// Upload to clodinary
const uploadToCloudinary = (req, res, next) => {
  const fileBase64 = req.file.buffer.toString('base64')
  const file = `data:${req.file.mimetype};base64,${fileBase64}`
  cloudinary.uploader.upload(file, function (err, result) {
    if (err) {
      console.log(err)
      return res.status(400).json({
        message: 'Gagal upload file!'
      })
    }
    req.photo = result.url
    next()
  })
}

module.exports = { uploadStorage, uploadToCloudinary }
