// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show bbotcamp' })
}

// @desc Create new bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `bootcamp ${req.params.id}` })
}

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'creat bbotcamp' })
}

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update bootcamp ${req.params.id}` })
}

// @desc Delete single bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: ` delete bootcamp ${req.params.id}` })
}
