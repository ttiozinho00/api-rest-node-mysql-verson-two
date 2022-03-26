const db = require("../model");
const dbPeriodo = db.periodo;

exports.create = (req, res, next) => {
    dbPeriodo.create({
        descPeriodo: req.body.descPeriodo,
        quantidade: req.body.quantidade
    })
        .then(periodo => {

            res.status(200).send(periodo)
        })
        .catch(next)
}

exports.findAll = (req, res, next) => {
    dbPeriodo.findAll()
        .then(periodo => {
            res.send(periodo)
        })
        .catch(next)
}

exports.findOne = (req, res, next) => {
    const id = req.params.id;

    dbPeriodo.findByPk(id)
        .then(perido => {
            if (perido) {
                res.status(200).send(perido);
            } else {
                res.status(500).send()
            }
        })
        .catch(next);
}

exports.update = (req, res, next) => {
    const periodo = {
        descPeriodo: req.body.descPeriodo,
        quantidade: req.body.quantidade
    };

    const id = req.params.id;

    dbPeriodo.update(periodo, {
        where: { idPeriodo: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "periodo foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não pode atualizar o periodo com id=${id}. Talvez o periodo não foi encontrado ou req.body está vazio!`
                });
            }
        })
        .catch(next);
};


exports.delete = (req, res, next) => {
    const id = req.params.id;

    dbPeriodo.destroy({
        where: { idPeriodo: id }
    })
        //retorna o boolean (True = 1 - ok / False = 0 - not ok)
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "periodo foi deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não pode periodo Plano com id=${id}. Talvez periodo não tenha sido encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possivel deletar periodo com id=" + id
            });
        });
};
