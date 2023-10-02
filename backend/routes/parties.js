const router = require('express').Router();

const partyController = require("../controllers/partyController");

router
    .route("/parties")
    .post((req, res) => partyController.create(req, res));

router
    .route("/party")
    .get((req, res) => partyController.getAll(req, res));

router
    .route("/party/:id")
    .get((req, res) => partyController.getParty(req, res));

router
    .route("/party/:id")
    .delete((req, res) => partyController.deleteParty(req, res));

router
    .route('/party/:id')
    .patch((req, res) => partyController.updateParty(req, res)); // Patch parcial ou Put integral?


module.exports = router;