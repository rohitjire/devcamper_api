const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query

  let querStr = JSON.stringify(req.query)

  querStr = querStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  query = Bootcamp.find(JSON.parse(querStr))

  const bootcamps = await query
  res.status(200).json({
    success: true, 
    count: bootcamps.length,
    data: bootcamps,
  })
})

// @desc Create new bootcamps
// @route POST /api/v1/bootcamps/
// @access Private
exports.getBootcamp = asyncHandler(async (req, res, next) => {
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
})

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({
    success: true,
    data: bootcamp,
  })
})

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
})

// @desc Delete single bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
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
})

// @desc Get bootcamps within a radius
// @route DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lag from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radius
  // Divide dist by radius of earth
  // Earth radius = 3,963 mi or 6378 km

  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  })
  res.status(200).json({
    succes: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})
