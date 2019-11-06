import express from "express";
const app = express();
const port = 3000;

import { getLocationSync } from "./services/location";

app.get("/", (req, res) => res.send("up and running"));
app.get("/location",  (req, res) => res.send(getLocationSync()));

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}!`);
});
