import express from 'express'
import jwt from 'jsonwebtoken'

export default function (req: express.Request, res: express.Response, next: Function) {
    if (!req.headers.authorization) {
        res.status(401).json({
            message: 'No authorization header'
        })
        return
    }
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        (req as any).tokenData = decoded;
        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
        return
    }
}
