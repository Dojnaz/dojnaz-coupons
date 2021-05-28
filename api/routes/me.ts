import express from 'express'
const Router = express.Router()
import User from '../db/user'

Router.get('/', (req, res) => {
    setTimeout(() => {
        res.json({
            name: "Victor Bäck",
            avatar: "https://cdn.discordapp.com/avatars/706902380637192212/360f70d04f20b1d4775b95f7324e3752.png?size=64"
        })
    }, 1000)
})

export default Router
