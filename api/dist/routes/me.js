"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
Router.get('/', (req, res) => {
    setTimeout(() => {
        res.json({
            name: "Victor Bäck",
            avatar: "https://cdn.discordapp.com/avatars/706902380637192212/360f70d04f20b1d4775b95f7324e3752.png?size=64"
        });
    }, 1000);
});
exports.default = Router;
//# sourceMappingURL=me.js.map