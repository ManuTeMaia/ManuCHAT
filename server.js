const express = require("express");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));
app.use(helmet());

app.listen(PORT, function() {
	console.log(`Example app listening on port ${PORT}!`);
});