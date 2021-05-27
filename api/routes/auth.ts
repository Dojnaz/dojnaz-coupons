import express from 'express'
const Router = express.Router()

const globalAny: any = global;

const numberRegex = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/

Router.get('/claim/:number', (req, res) => {
    if (numberRegex.test(req.params.number)) {
        globalAny.SMSQueue.push({
            number: req.params.number,
            content: "Hello! You've requested to claim your account at Dojnaz Coupons. Your code is " + Math.floor(100000 + Math.random() * 900000).toString()
        })
        setTimeout(() => {
            res.json({
                success: true
            })
        }, 1000)
    } else {
        setTimeout(() => {
            res.json({
                success: false,
                message: 'Invalid phone number'
            })
        }, 1000)
    }
})

export default Router
