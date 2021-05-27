"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponTypes_1 = __importDefault(require("./couponTypes"));
const auth_1 = __importDefault(require("./auth"));
const me_1 = __importDefault(require("./me"));
const Router = express_1.default.Router();
Router.use('/couponTypes', couponTypes_1.default);
Router.use('/auth', auth_1.default);
Router.use('/me', me_1.default);
exports.default = Router;
//# sourceMappingURL=index.js.map