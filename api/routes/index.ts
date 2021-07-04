import express from 'express'
import couponTypes from './couponTypes'
import auth from './auth'
import me from './me'
import bodyParser from 'body-parser'

const Router = express.Router()
Router.use(bodyParser.json())

Router.use('/couponTypes', couponTypes)
Router.use('/auth', auth)
Router.use('/me', me)

export default Router
