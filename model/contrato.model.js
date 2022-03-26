const email = require('../nodemailer')
module.exports = (sequelize, Sequelize) => {
    const contrato = sequelize.define("contrato", {
        idContrato: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descContrato: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descContrato']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descContrato']
                },
            },
        },
        infoContrato: {
            type: Sequelize.STRING(45),
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            columnName: 'dataCadastro',
            field: 'dataCadastro'
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            columnName: 'dataAlteracao',
            field: 'dataAlteracao'
        }
    },

    );

    contrato.afterCreate(async (contrato, options) => {
        email.sendEmail();
    });



    contrato.associate = models => {
        contrato.belongsTo(models.plano, {
            foreignKey: 'planoId',
        })
    }

    return contrato;
};


