const db = require("../model");
const dbAnuncio = db.anuncio;
const dbTipoAnuncio = db.tipoAnuncio;
const dbPeriodo = db.periodo;

// Anuncio e tipo de anuncio 1:1
exports.create = (req, res, next) => {

    dbAnuncio.create({
        descAnuncio: req.body.descAnuncio,
        qtdeMinAnuncio: req.body.qtdeMinAnuncio,
        qtdeAnuncio: req.body.qtdeAnuncio,
        valorUnitAnuncio: req.body.valorUnitAnuncio,
        valorTotalAnuncio: req.body.valorTotalAnuncio,
        desconto: req.body.desconto,
        tipoAnuncios: {
            descTipoAnuncio: req.body.descTipoAnuncio
        }
    }, {
        include: {
            model: dbTipoAnuncio,
            as: 'tipoAnuncios'
        }
    }
    )
        .then(anuncio => {
            if (anuncio) {
                res.status(200).send(anuncio);
            } else {
                res.status(500).send()
            }
        })
        .catch(next);

};

exports.findAll = (req, res, next) => {
    dbAnuncio.findAll({
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
                attributes: ['idTipoAnuncio', 'descTipoAnuncio']
            },
        ]
    })
        .then(anuncio => {
            if (anuncio) {
                res.status(200).send(anuncio);
            } else {
                res.status(500).send()
            }
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    dbAnuncio.findByPk(id, {
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
                attributes: ['idTipoAnuncio', 'descTipoAnuncio']
            },
        ]
    })
        .then(anuncio => {
            if (anuncio) {
                res.status(200).send(anuncio);
            } else {
                res.status(500).send()
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando o anuncio com a id=" + id
            });
        });
};

exports.update = (req, res) => {

    const id = req.params.id;

    const {
        descAnuncio,
        qtdeMinAnuncio,
        qtdeAnuncio,
        valorUnitAnuncio,
        valorTotalAnuncio,
        desconto,
        descTipoAnuncio
    } = req.body;

    const updateAnuncio = {
        descAnuncio,
        qtdeMinAnuncio,
        qtdeAnuncio,
        valorUnitAnuncio,
        valorTotalAnuncio,
        desconto
    };

    const updateTipoAnuncio = {
        descTipoAnuncio
    };

    const updatePromises = [];

    const updateAnuncioDetailsPromise = dbAnuncio.update(updateAnuncio, {
        where: { idAnuncio: id }
    });

    updatePromises.push(updateAnuncioDetailsPromise);

    const updateTipoAnuncioDetailsPromise = dbTipoAnuncio.update(updateTipoAnuncio, {
        where: { idTipoAnuncio: id }
    });

    updatePromises.push(updateTipoAnuncioDetailsPromise);

    const getAllPromisses = (updatePromises) => {
        return Promise.all(updatePromises);
    }

    getAllPromisses(updatePromises)
        .then(num => {
            num.length > 0 ?
                res.status(200).send({
                    message: "Anuncio foi atualizado com sucesso."
                })
                :
                res.send({
                    message: `Não pode atualizar o Anuncio com id=${id}. Talvez o Anuncio não foi encontrado ou req.body está vazio!`
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error atualizando tipo de anuncio com id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    dbAnuncio.destroy({
        where: {
            idAnuncio: id
        },
        cascade: true,
        include: [{
            model: dbTipoAnuncio,
            as: 'tipoAnuncios',
            cascade: true,
        }],
    })
        //retorna o boolean (True = 1 - ok / False = 0 - not ok)
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "anuncio foi deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não pode deletar anuncio com id=${id}. Talvez anuncio não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possivel deletar anuncio com id=" + id
            });
        });
};

exports.addPeriodoInAnuncio = (req, res, next) => {
    dbAnuncio.findByPk(req.body.idAnuncio)
        .then(anuncio => {

            if (!anuncio) {
                res.send({ message: "anuncio não encontrado!" });
            };
            dbPeriodo.findByPk(req.body.idPeriodo)
                .then(periodo => {
                    if (!periodo) {
                        res.send({ message: "periodo não encontrado!" });
                    };
                    anuncio.addPeriodo(periodo)
                    res.send({ message: "periodo Incluido com sucesso!" });
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: "Ocorreu algum error ao adicionar periodo no tipo de plano: ", err
            });
        });
}

