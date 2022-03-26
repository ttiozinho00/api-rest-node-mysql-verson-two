module.exports = app => {
    const periodo = require("../controllers/periodo.controller");
    const router = require("express").Router();

    // Create a new periodo
    router.post("/", periodo.create);

    // Retrieve all periodos
    router.get("/", periodo.findAll);

    // Retrieve one periodos
    router.get("/:id", periodo.findOne);

    // Update a periodo with id
    router.put("/:id", periodo.update);

    // Delete a periodo with id
    router.delete("/:id", periodo.delete);


    app.use('/api/periodo', router);
}