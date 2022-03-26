const db = require("../model");
const Op = db.Sequelize.Op;
const dbPlano = db.plano;
const dbTipoPlano = db.tipoPlano;
const dbAnuncio = db.anuncio;
const dbTipoAnuncio = db.tipoAnuncio;
const dbPeriodo = db.periodo;
const dbDestaque = db.destaque;
const dbTipoDestaque = db.tipoDestaque;

exports.create = (req, res, next) => {
    dbPlano.create({
        descPlano: req.body.descPlano,
    })
        .then(plano => {
            if (plano) {
                res.status(200).send(plano);
            } else {
                res.status(500).send()
            }

        })
        .catch(next);
};

exports.findAll = (req, res, next) => {
    dbPlano.findAll({
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
            },],
    })
        .then(plano => {
            res.send(plano);

        })
        .catch(next);
};

exports.findOneByName = (req, res, next) => {
    const descPlano = req.query.descPlano;
    let condition = descPlano ? { descPlano: { [Op.like]: `${descPlano}%` } } : null;

    dbPlano.findOne({
        where: condition,
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
            },],
    })
        .then(plano => {
            if (plano) {
                res.status(200).send(plano);
            } else {
                res.status(500).send()
            }
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    const plano = {
        descPlano: req.body.descPlano,
    };

    const id = req.params.id;

    dbPlano.update(plano, {
        where: { idPlano: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plano foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não pode atualizar o Plano com id=${id}. Talvez o Plano não foi encontrado ou req.body está vazio!`
                });
            }
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    dbPlano.destroy({
        where: { idPlano: id }
    })
        //retorna o boolean (True = 1 - ok / False = 0 - not ok)
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plano foi deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não pode deletar Plano com id=${id}. Talvez Plano não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possivel deletar Plano com id=" + id
            });
        });
};

exports.addTipoPlanoInPlano = (req, res, next) => {
    dbPlano.findByPk(req.body.idPlano)
        .then(plano => {

            if (!plano) {
                res.send({ message: "Plano não encontrado!" });
            };
            dbTipoPlano.findByPk(req.body.idTipoPlano)
                .then(tipoPlano => {
                    if (!tipoPlano) {
                        res.send({ message: "Tipo de plano não encontrado!" });
                    };
                    plano.addTipoPlano(tipoPlano)
                    res.send({ message: "Tipo de Plano Incluido com sucesso!" });
                })
        })

        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar tipo de plano no Plano: ", err
            });
        });
}
exports.addPeriodoInPlano = (req, res, next) => {
    dbPlano.findByPk(req.body.idPlano)
        .then(plano => {

            if (!plano) {
                res.send({ message: "Plano não encontrado!" });
            };
            dbPeriodo.findByPk(req.body.idPeriodo)
                .then(periodo => {
                    if (!periodo) {
                        res.send({ message: "periodo não encontrado!" });
                    };
                    plano.addPeriodo(periodo)
                    res.send({ message: "periodo Incluido com sucesso!" });
                })
        })

        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar periodo no Plano: ", err
            });
        });
} 