import express from 'express'
import couponTypes from './couponTypes'
const Router = express.Router()

Router.use('/couponTypes', couponTypes)

export default Router
