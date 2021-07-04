import express from 'express'
import CouponType from './../db/couponType'

const Router = express.Router()

Router.get('/', async (req, res) => {
    const types = await CouponType.find({})
    res.json(types.map((type) => {
        return {
            title: type.name,
            img: type.img,
            slug: type.slug
        }
    }))
})

export default Router
