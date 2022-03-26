module.exports = app => {
    const anuncio = require("../controllers/anuncio.controller");

    const router = require("express").Router();

    // Create a new anuncio
    router.post("/", anuncio.create);

    // Retrieve all anuncios
    router.get("/", anuncio.findAll);
    // Retrieve one anuncios
    router.get("/:id", anuncio.findOne);

    // Update a anuncio with id
    router.put("/:id", anuncio.update);

    // Delete a anuncio with id
    router.delete("/:id", anuncio.delete);

    //Adding periodo in anuncio
    router.post("/addPeriodoInAnuncio", anuncio.addPeriodoInAnuncio);

    app.use('/api/anuncio', router);
};