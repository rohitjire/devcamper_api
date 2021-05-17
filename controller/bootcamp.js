const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    })
  } catch (error) {
    next(error)
  }
}

// @desc Create new bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id} in database`,
          404
        )
      )
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    next(error)
  }
}

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id} in database`,
          404
        )
      )
    }

    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    next(error)
  }
}

// @desc Delete single bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id} in database`,
          404
        )
      )
    }
    res.status(200).json({ success: true, message: 'Bootcamp Deleted' })
  } catch (error) {
    next(error)
  }
}
