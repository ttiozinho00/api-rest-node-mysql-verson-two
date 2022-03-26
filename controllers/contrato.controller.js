const db = require("../model");
const dbContrato = db.contrato;
const dbPlano = db.plano;
const dbTipoPlano = db.tipoPlano;
const dbAnuncio = db.anuncio;
const dbTipoAnuncio = db.tipoAnuncio;
const dbPeriodo = db.periodo;
const dbDestaque = db.destaque;
const dbTipoDestaque = db.tipoDestaque;

exports.create = (req, res, next) => {
    dbContrato.create({
        descContrato: req.body.descContrato,
        infoContrato: req.body.infoContrato,
        planoId: req.body.planoId
    })
        .then(contrato => {
            res.status(200).send(contrato);
        })
        .catch(next);
};

exports.findAll = (req, res, next) => {
    dbContrato.findAll({
        include: [
            {
                model: dbPlano,
                attributes: ['idPlano', 'descPlano'],
                include: [
                    {
                        model: dbPeriodo,
                        attributes: ['idPeriodo', 'descPeriodo', 'quantidade']
                    },
                    {
                        model: dbTipoPlano,
                        as: 'tipoPlanos',
                        attributes: ['idTipoPlano', 'descTipoPlano', 'valorTipoPlano', 'desconto', 'valorTotal'],
                        through: {
                            attributes: [],
                        },
                        include: [
                            {
                                model: dbPeriodo,
                                as: 'periodos',
                                attributes: ['idPeriodo', 'descPeriodo', 'quantidade'],
                                through: {
                                    attributes: [],
                                }
                            },
                            {
                                model: dbAnuncio,
                                as: 'anuncios',
                                attributes: ['idAnuncio', 'descAnuncio', 'qtdeMinAnuncio', 'qtdeAnuncio', 'valorUnitAnuncio', 'valorTotalAnuncio', 'desconto'],
                                through: {
                                    attributes: [],
                                },
                                include: [
                                    {
                                        model: dbPeriodo,
                                        as: 'periodos',
                                        attributes: ['idPeriodo', 'descPeriodo', 'quantidade'],
                                        through: {
                                            attributes: [],
                                        }
                                    },
                                    {
                                        model: dbTipoAnuncio,
                                        as: 'tipoAnuncios',
                                        attributes: ['idTipoAnuncio', 'descTipoAnuncio'],
                                    },


                                ]
                            },
                            {
                                model: dbDestaque,
                                as: 'destaques',
                                attributes: ['idDestaque', 'descDestaque', 'qtdeMinDestaque', 'qtdeDestaque', 'valorUnitDestaque', 'valorTotalDestaque', 'desconto'],
                                through: {
                                    attributes: [],
                                },
                                include: [
                                    {
                                        model: dbPeriodo,
                                        as: 'periodos',
                                        attributes: ['idPeriodo', 'descPeriodo', 'quantidade'],
                                        through: {
                                            attributes: [],
                                        }
                                    },
                                    {
                                        model: dbTipoDestaque,
                                        as: 'tipoDestaques',
                                        attributes: ['idTipoDestaque', 'descTipoDestaque'],
                                    }
                                ]
                            }

                        ]
                    }

                ]
            }

        ]
    })
        .then(contrato => {
            res.send(contrato)
        })
        .catch(next);
}