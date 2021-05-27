"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const globalAny = global;
const numberRegex = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/;
Router.get('/claim/:number', (req, res) => {
    if (numberRegex.test(req.params.number)) {
        globalAny.SMSQueue.push({
            number: req.params.number,
            content: "Hello! You've requested to claim your account at Dojnaz Coupons. Your code is " + Math.floor(100000 + Math.random() * 900000).toString()
        });
        setTimeout(() => {
            res.json({
                success: true
            });
        }, 1000);
    }
    else {
        setTimeout(() => {
            res.json({
                success: false,
                message: 'Invalid phone number'
            });
        }, 1000);
    }
});
exports.default = Router;
//# sourceMappingURL=auth.js.map