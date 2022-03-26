module.exports = app => {
    const TipoPlano = require("../controllers/tipoPlano.controller");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", TipoPlano.create);

    // Retrieve all Tutorials
    router.get("/", TipoPlano.findAll);

    // Update a Tutorial with id
    router.put("/:id", TipoPlano.update);

    // Delete a Tutorial with id
    router.delete("/:id", TipoPlano.delete);

    //Add anuncio in Tipo de Plano
    router.post("/addAnuncioInTipoPlano", TipoPlano.addAnuncioInTipoPlano);

    //Add anuncio in Tipo de Plano
    router.post("/addPeriodoInTipoPlano", TipoPlano.addPeriodoInTipoPlano);

    //Add anuncio in Tipo de Plano
    router.post("/addDestaqueInTipoPlano", TipoPlano.addDestaqueInTipoPlano);


    app.use('/api/tipoPlano', router);
};