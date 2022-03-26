module.exports = app => {
    const plano = require("../controllers/plano.controller");

    const router = require("express").Router();

    // Create a new plano
    router.post("/", plano.create);

    // Retrieve all planos
    router.get("/", plano.findAll);

    // Retrieve one planos
    router.get("/findByName", plano.findOneByName);

    // Update a plano with id
    router.put("/:id", plano.update);

    // Delete a plano with id
    router.delete("/:id", plano.delete);

    //Add tipo de plano in Plano
    router.post("/addTipoPlanoInPlano", plano.addTipoPlanoInPlano);

    //Add periodo in Plano
    router.post("/addPeriodoInPlano", plano.addPeriodoInPlano);

    app.use('/api/plano', router);
};

//Para pesquisar com nome : http://localhost:8083/api/plano/findByName?descPlano=Primeiro