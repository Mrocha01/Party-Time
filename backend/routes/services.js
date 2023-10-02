const router = require('express').Router();

const serviceController = require("../controllers/serviceController");

router
    .route("/services")
    .post((req, res) => serviceController.create(req, res)); // não entendi porque 02 req, res

router
    .route("/services")
    .get((req, res) => serviceController.getAll(req, res));

router
    .route("/service/:id")
    .get((req, res) => serviceController.getService(req, res));

router
    .route('/service/:id')
    .delete((req, res) => serviceController.deleteService(req, res));

router
    .route('/service/:id')
    .patch((req, res) => serviceController.updateService(req, res)); // Patch parcial ou Put integral?

module.exports = router;