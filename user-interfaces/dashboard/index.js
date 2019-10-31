const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + "/client/dist"));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});