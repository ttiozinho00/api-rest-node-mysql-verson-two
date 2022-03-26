const db = require("../model");
const dbDestaque = db.destaque;
const dbPeriodo = db.periodo;
const dbTipoDestaque = db.tipoDestaque;

exports.create = (req, res, next) => {
    dbDestaque.create({
        descDestaque: req.body.descDestaque,
        qtdeMinDestaque: req.body.qtdeMinDestaque,
        qtdeDestaque: req.body.qtdeDestaque,
        valorUnitDestaque: req.body.valorUnitDestaque,
        valorTotalDestaque: req.body.valorTotalDestaque,
        desconto: req.body.desconto,
        tipoDestaques: {
            descTipoDestaque: req.body.descTipoDestaque
        }
    }, {
        include: {
            model: dbTipoDestaque,
            as: 'tipoDestaques'
        }
    })
        .then(destaque => {
            destaque ? res.status(200).send(destaque) : res.status(500).send(destaque)
        })
        .catch(next);
};

exports.findAll = (req, res, next) => {
    dbDestaque.findAll({
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
    })
        .then(destaque => {
            if (destaque) {
                res.status(200).send(destaque);
            } else {
                res.status(500).send();
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum error ocorreu quando recuperava os planos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    dbDestaque.findByPk(id, {
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
                attributes: ['idTipoDestaque', 'descTipoDestaque']
            }
        ]
    })
        .then(destaque => {
            if (destaque) {
                res.status(200).send(destaque);
            } else {
                res.status(500).send()
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando o Plano com a id=" + id
            });
        });
};

exports.update = (req, res) => {

    const id = req.params.id;

    const {
        descDestaque,
        qtdeMinDestaque,
        qtdeDestaque,
        valorUnitarioDestaque,
        valorTotalDestaque,
        desconto,
        descTipoDestaque
    } = req.body;

    const updateDestaque = {
        descDestaque,
        qtdeMinDestaque,
        qtdeDestaque,
        valorUnitarioDestaque,
        valorTotalDestaque,
        desconto
    };

    const updateTipoDestaque = {
        descTipoDestaque
    }

    const updatePromises = [];

    const updateDestaqueDetailsPromise = dbDestaque.update(updateDestaque, {
        where: { idDestaque: id }
    });

    updatePromises.push(updateDestaqueDetailsPromise);

    const updateTipoDestaqueDetailsPromisses = dbTipoDestaque.update(updateTipoDestaque, {
        where: { idTipoDestaque: id }
    });

    updatePromises.push(updateTipoDestaqueDetailsPromisses);

    const getAllPromisses = (updatePromises) => {
        return Promise.all(updatePromises);
    }

    getAllPromisses(updatePromises)
        .then(num => {
            num.length > 0 ?
                res.status(200).send({
                    message: "Destaque foi atualizado com sucesso."
                })
                :
                res.send({
                    message: `Não pode atualizar o Destaque com id=${id}. Talvez o Destaque não foi encontrado ou req.body está vazio!`
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error atualizando tipo de Destaque com id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    dbDestaque.destroy({
        where: { idDestaque: id },
        cascade: true,
        include: [{
            model: dbTipoDestaque,
            as: 'tipoDestques',
            cascade: true,
        }],
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

exports.addPeriodoInDestaque = (req, res, next) => {
    dbDestaque.findByPk(req.body.idDestaque)
        .then(destaque => {

            if (!destaque) {
                res.send({ message: "destaque não encontrado!" });
            };
            dbPeriodo.findByPk(req.body.idPeriodo)
                .then(periodo => {
                    if (!periodo) {
                        res.send({ message: "periodo não encontrado!" });
                    };
                    destaque.addPeriodo(periodo)
                    res.send({ message: "periodo Incluido com sucesso!" });
                })
        })

        .catch(next);
};