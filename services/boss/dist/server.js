"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const ioredis_1 = __importDefault(require("ioredis"));
const pub = new ioredis_1.default(6379, "redis");
const location_1 = require("./services/location");
app.use(cors_1.default());
app.get("/", (req, res) => {
    // tslint:disable-next-line:no-console
    console.log("boss service / received request");
    res.send("up and running");
});
app.get("/location", (req, res) => {
    pub.publish("systemevents", "BOSS_SERVICE > (GET) /location");
    res.send(location_1.getLocationSync());
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}!`);
});
//# sourceMappingURL=server.js.map