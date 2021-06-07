import express from 'express'

export default function (req: express.Request, res: express.Response, next: Function) {
    if (!req.headers.authorization) {
        res.status(401).json({
            message: 'No authorization header'
        })
        return
    }
    next()
}