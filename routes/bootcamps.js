const express = require('express')
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controller/bootcamp')

// Include other resource router

const courseRouter = require('./courses')

const router = express.Router()

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router
