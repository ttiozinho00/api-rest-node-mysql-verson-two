module.exports = app => {
    const contrato = require("../controllers/contrato.controller");
    const router = require("express").Router();

    router.post("/", contrato.create);
    router.get("/", contrato.findAll);

    app.use('/api/contrato', router);
}