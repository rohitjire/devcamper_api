const express = require('express')
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controller/bootcamp')
const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')
const Bootcamp = require('../models/Bootcamp')

// Include other resource router

const courseRouter = require('./courses')

const router = express.Router()

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').put(protect, bootcampPhotoUpload)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

module.exports = router
