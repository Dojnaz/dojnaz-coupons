import express from 'express'
const Router = express.Router()
import User from '../db/user'
import enforceAuth from './../utils/enforceAuth'

Router.get('/', enforceAuth, async (req, res) => {
  const userData = await User.findOne({
    _id: (req as any).tokenData.userId
  })
  res.json({
    userName: userData.name || userData.number || userData.email,
    number: userData.number,
    email: userData.email,
    name: userData.name,
    avatar: "https://cdn.discordapp.com/avatars/706902380637192212/360f70d04f20b1d4775b95f7324e3752.png?size=64"
  })
})

Router.post('/name', enforceAuth, async (req, res) => {
  if (!req.body.name || req.body.name < 1 || req.body.name > 64) return res.status(400).json({
    message: "No or invalid password"
  })
  const userData = await User.findOne({
    _id: (req as any).tokenData.userId
  })
  if (!userData) return res.status(404)
  userData.name = req.body.name
  await userData.save()
  res.json({
    message: 'ok'
  })
})

export default Router
