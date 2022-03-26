const db = require("../model");
const dbtipoPlano = db.tipoPlano;
const dbAnuncio = db.anuncio;
const dbPeriodo = db.periodo;
const dbDestaque = db.destaque;
const dbTipoDestaque = db.tipoDestaque;
const dbTipoAnuncio = db.tipoAnuncio;

exports.create = (req, res, next) => {
    dbtipoPlano.create(
        {
            descTipoPlano: req.body.descTipoPlano,
            valorTipoPlano: req.body.valorTipoPlano,
            desconto: req.body.desconto,
            valorTotal: req.body.valorTotal,
        }
    )
        .then(tipoPlano => {
            if (tipoPlano) {
                res.status(200).send(tipoPlano);
            } else {
                res.status(500).send(tipoPlano)
            }
        })
        .catch(next);
};

exports.findAll = (req, res, next) => {
    dbtipoPlano.findAll({
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

    })
        .then(tipoPlano => {
            res.send(tipoPlano);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum error ocorreu quando recuperava os tipos de Plano."
            });
        });
};

exports.findOne = (req, res, next) => {
    const id = req.params.id;

    dbtipoPlano.findByPk(id, {
        include: [
            {
                model: dbPeriodo,
                as: 'periodos',
                attributes: ['idPeriodo', 'descPeriodo'],
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
    })
        .then(tipoPlano => {
            if (!tipoPlano) {
                res.send({
                    message: "Tipo de Plano não encontrado!"
                });
            }
            res.send(tipoPlano);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando o  tipoPlano com a id=" + id
            });
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;

    dbtipoPlano.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tipo de plano foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não é possivel atualizar o tipo de Plano com id=${id}. Talvez tipoPlano não foi encontrado ou req.body está vazio`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error atualizando o tipoPlano com id=" + id
            });
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    dbtipoPlano.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "tipoPlano foi deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não pode deletar o tipoPlano com id=${id}. Talvez tipoPlano não foi encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possivel deletar tipoPlano com id=" + id
            });
        });
};

exports.addAnuncioInTipoPlano = (req, res, next) => {
    dbtipoPlano.findByPk(req.body.idTipoPlano)
        .then(tipoPlano => {

            if (!tipoPlano) {
                res.send({ message: "TipoPlano não encontrado!" });
            };
            dbAnuncio.findByPk(req.body.idAnuncio)
                .then(anuncio => {
                    if (!anuncio) {
                        res.send({ message: "anuncio não encontrado!" });
                    };
                    tipoPlano.addAnuncio(anuncio)
                    res.send({ message: "anuncio Incluido com sucesso!" });
                })
        })

        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar anuncio no tipo de plano: ", err
            });
        });
};

exports.addPeriodoInTipoPlano = (req, res, next) => {
    dbtipoPlano.findByPk(req.body.idTipoPlano)
        .then(tipoPlano => {

            if (!tipoPlano) {
                res.send({ message: "TipoPlano não encontrado!" });
            };
            dbPeriodo.findByPk(req.body.idPeriodo)
                .then(periodo => {
                    if (!periodo) {
                        res.send({ message: "periodo não encontrado!" });
                    };
                    tipoPlano.addPeriodo(periodo)
                    res.send({ message: "periodo Incluido com sucesso!" });
                })
        })

        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar periodo no tipo de plano: ", err
            });
        });
};

exports.addDestaqueInTipoPlano = (req, res, next) => {
    dbtipoPlano.findByPk(req.body.idTipoPlano)
        .then(tipoPlano => {

            if (!tipoPlano) {
                res.send({ message: "TipoPlano não encontrado!" });
            };
            dbDestaque.findByPk(req.body.idDestaque)
                .then(destaque => {
                    if (!destaque) {
                        res.send({ message: "destaque não encontrado!" });
                    };
                    tipoPlano.addDestaque(destaque)
                    res.send({ message: "destaque Incluido com sucesso!" });
                })
        })

        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar destaque no tipo de plano: ", err
            });
        });
};

