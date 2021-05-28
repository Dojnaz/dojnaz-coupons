import express from 'express'
import User from '../db/user'
import ClaimToken from '../db/claimToken'
import jwt from 'jsonwebtoken'
const Router = express.Router()

const globalAny: any = global;

const numberRegex = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/

Router.get('/claim/:number', async (req, res) => {
    try {
        if (!numberRegex.test(req.params.number)) {
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
        }, 1000)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

export default Router
