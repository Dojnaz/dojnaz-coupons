import express from 'express'
const Router = express.Router()

Router.get('/', (req, res) => {
    setTimeout(() => {
        res.json([
            {
                title: 'Free Coca-Cola Energy (2kr)',
                img: 'https://3.kupong.se/uploaded-images/coupon/Coke_Energy_new-480x675-Swedish.jpg',
                slug: 'coke'
            }
        ])
    }, 1000)
})

export default Router
