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
const Bootcamp = require('../models/Bootcamp')

// Include other resource router

const courseRouter = require('./courses')

const router = express.Router()

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').put(bootcampPhotoUpload)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router
