import express from "express";
const app = express();
const port = 3000;
import Redis from "ioredis";
const pub = new Redis(6379, "redis");

import { getLocationSync } from "./services/location";

app.get("/", (req, res) => {

    // tslint:disable-next-line:no-console
    console.log("boss service / received request");
    res.send("up and running");
}
);
app.get("/location", (req, res) => {
    res.send(getLocationSync());
    pub.publish("systemevents", "BOSS_SERVICE > (GET) /location");
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}!`);
});
