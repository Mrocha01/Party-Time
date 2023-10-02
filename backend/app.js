const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

// DB Connection
const conn = require("./db/conn");

conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes); // não entendi o router

app.listen(3000, () => {
    console.log("conectado a porta 3000");
});