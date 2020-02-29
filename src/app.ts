require('dotenv').config();
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')))

const openAPI_Documentation = require("./openApiDoc/spec.js");

//You don't have to focus on this one
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(openAPI_Documentation));

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


