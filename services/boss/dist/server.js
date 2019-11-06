"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const location_1 = require("./services/location");
app.get("/", (req, res) => res.send("up and running"));
app.get("/location", (req, res) => res.send(location_1.getLocationSync()));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}!`);
});
//# sourceMappingURL=server.js.map