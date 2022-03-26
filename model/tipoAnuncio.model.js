module.exports = (sequelize, Sequelize) => {
    const tipoAnuncio = sequelize.define("tipoAnuncio", {
        idTipoAnuncio: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descTipoAnuncio: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descTipoAnuncio']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descTipoAnuncio']
                },
            },
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

    tipoAnuncio.associate = models => {
        tipoAnuncio.belongsTo(models.anuncio, {
            foreignKey: 'anuncioId',
            as: 'anuncios'
        })
    }

    return tipoAnuncio;
};
