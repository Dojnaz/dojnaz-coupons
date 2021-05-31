import express from 'express'
import User from '../db/user'
import ClaimToken from '../db/claimToken'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

const Router = express.Router()

Router.use(bodyParser.json())

const redeemedJWTs: string[] = []

const globalAny: any = global;

const swedishRegex = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/
const germanRegex = /^[+]491\d{9,10}/
const ukRegex = /^[+]44\d{7,15}/

Router.post('/login', async (req, res) => {
  if (!req.body.username || typeof req.body.username != "string" || req.body.username.length < 1) {
    res.status(400).json({
      message: "No or invalid username"
    })
    return
  }
  if (!req.body.password || typeof req.body.password != "string" || req.body.password.length < 6 || req.body.password.length > 64) {
    res.status(400).json({
      message: "No or invalid password"
    })
    return
  }
  const user = await User.findOne({
    $or: [
      {
        email: req.body.username
      },
      {
        number: req.body.username
      }
    ],
    unclaimed: false
  })
  if (!user) {
    res.status(401).json({
      message: "Credentials doesn't match any of our records"
    })
    return
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    res.json({
      token: jwt.sign({
        userId: user._id
      }, process.env.JWT_SECRET)
    })
  } else {
    res.status(401).json({
      message: "Credentials doesn't match any of our records"
    })
  }
})

Router.get('/claim/:number', async (req, res) => {
  try {
    if (!swedishRegex.test(req.params.number) && !germanRegex.test(req.params.number) && !ukRegex.test(req.params.number)) {
      setTimeout(() => {
        res.status(400).json({
          success: false,
          message: 'Invalid phone number'
        })
      }, 1000)
      return
    }
    const profile = await User.findOne({
      number: req.params.number,
      unclaimed: true
    })
    if (!profile) {
      res.status(404).json({
        message: "Can't find claimable account with this number"
      })
      return
    }
    const claimToken = new ClaimToken({
      owner: profile._id,
      token: Math.floor(100000 + Math.random() * 900000).toString(),
      created: Date.now()
    })
    await claimToken.save()
    globalAny.SMSQueue.push({
      number: req.params.number,
      content: "Hello! You've requested to claim your account at Dojnaz Coupons. Your code is " + claimToken.token
    })
    setTimeout(() => {
      res.json({
        success: true,
        token: jwt.sign({
          tokenID: claimToken._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 5),
        }, process.env.JWT_SECRET)
      })
    }, 2500)
  } catch (err) {
    res.status(500).json({
      message: 'Unable to process request'
    })
    console.error(err)
  }
})

Router.get('/claim/:token/:code', async (req, res) => {
  if (redeemedJWTs.includes(req.params.token)) {
    res.json({
      message: "This token has already been used"
    })
    return
  }
  redeemedJWTs.push(req.params.token)
  setTimeout(() => {
    redeemedJWTs.splice(redeemedJWTs.indexOf(req.params.token), 1)
  }, 60 * 5 * 1000)
  try {
    const decoded: any = jwt.verify(req.params.token, process.env.JWT_SECRET)
    const profile = await ClaimToken.findOne({
      _id: decoded.tokenID
    })
    if (!profile) {
      res.status(404).json({
        message: "Couldn't find profile! (Already claimed?)"
      })
      return
    }
    if (profile.token != req.params.code) {
      res.status(400).json({
        message: 'Invalid Code!'
      })
      return
    }
    res.json({
      token: jwt.sign({
        tokenID: decoded.tokenID,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        verified: true
      }, process.env.JWT_SECRET)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Unable to process request'
    })
  }
})

Router.post('/claimFinal/:token', async (req, res) => {
  if (redeemedJWTs.includes(req.params.token)) {
    res.json({
      message: "This token has already been used"
    })
    return
  }
  redeemedJWTs.push(req.params.token)
  setTimeout(() => {
    redeemedJWTs.splice(redeemedJWTs.indexOf(req.params.token), 1)
  }, 60 * 5 * 1000)
  try {
    if (!req.body.password) {
      res.status(400).json({
        message: 'No password'
      })
      return
    }
    if (req.body.password.length < 6) {
      res.status(400).json({
        message: 'Password must be at least 6 characters long!'
      })
      return
    }
    if (req.body.password.length > 64) {
      res.status(400).json({
        message: 'Password must be less than or equal to 64 characters long!'
      })
      return
    }
    const decoded: any = jwt.verify(req.params.token, process.env.JWT_SECRET)
    if (!decoded.verified) {
      res.status(403).json({
        message: "This token isn't verified"
      })
      return
    }
    const claimToken = await ClaimToken.findOne({
      _id: decoded.tokenID
    })
    if (!claimToken) {
      res.status(404).json({
        message: "The token wasn't found"
      })
      return
    }
    const user = await User.findOne({
      _id: claimToken.owner,
      unclaimed: true
    })
    if (!user) {
      res.status(404).json({
        message: "This user doesn't exist"
      })
      return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    user.password = hashedPassword
    user.unclaimed = false
    await user.save()
    await claimToken.remove()
    res.json({
      message: 'ok'
    })
  } catch {
    res.status(500).json({
      message: "An error has occured"
    })
  }
})

export default Router
