"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.get('/', (req, res) => {
    setTimeout(() => {
        res.json([
            {
                title: 'Free Coca-Cola Energy (2kr)',
                img: 'https://3.kupong.se/uploaded-images/coupon/Coke_Energy_new-480x675-Swedish.jpg',
                slug: 'coke'
            }
        ]);
    }, 1000);
});
exports.default = Router;
//# sourceMappingURL=couponTypes.js.map