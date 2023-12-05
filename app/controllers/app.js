const getRoot = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'devAcademy API is up and running'
  })
}

const notFound = (req, res) => {
  res.status(404).json({
    status: 'FAIL',
    message: 'End point not found or worng method'
  })
}

module.exports = {
  getRoot,
  notFound
}
