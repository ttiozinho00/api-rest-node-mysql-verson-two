module.exports = app => {
    const destaque = require("../controllers/destaque.controller");
    const router = require("express").Router();

    //create a new destaque
    router.post("/", destaque.create);

    //find all destaques
    router.get("/", destaque.findAll);

    router.get("/:id", destaque.findOne);

    router.put("/:id", destaque.update);

    router.delete("/", destaque.delete);

    router.post("/addPeriodoInDestaque", destaque.addPeriodoInDestaque);

    app.use('/api/destaque', router);
}