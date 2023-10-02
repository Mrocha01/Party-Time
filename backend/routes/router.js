const router = require('express').Router();

// Services routes
const servicesRouter = require("./services");

router.use("/", servicesRouter);

// Parties routes
const partyRouter = require("./parties");

router.use("/", partyRouter);

module.exports = router;