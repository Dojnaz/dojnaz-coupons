import express from 'express'
import couponTypes from './couponTypes'
import me from './me'
const Router = express.Router()

Router.use('/couponTypes', couponTypes)
Router.use('/me', me)

export default Router
