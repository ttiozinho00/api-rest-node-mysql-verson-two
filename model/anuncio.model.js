module.exports = (sequelize, Sequelize) => {

    const anuncio = sequelize.define("anuncio", {
        idAnuncio: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descAnuncio: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descAnuncio']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descAnuncio']
                },
            },
        },
        qtdeMinAnuncio: {
            type: Sequelize.INTEGER
        },
        qtdeAnuncio: {
            type: Sequelize.INTEGER
        },
        valorUnitAnuncio: {
            type: Sequelize.FLOAT
        },
        valorTotalAnuncio: {
            type: Sequelize.FLOAT
        },
        desconto: {
            type: Sequelize.FLOAT
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false,
            columnName: 'dataAlteracao',
            field: 'dataAlteracao'
        }
    },

    );

    anuncio.associate = models => {

        anuncio.belongsToMany(models.tipoPlano, {
            through: 'tipoPlano_anuncio',
            foreignKey: 'anuncioId',
            as: 'tipoPlanos'
        });

        anuncio.hasOne(models.tipoAnuncio, {
            foreignKey: 'anuncioId',
            as: 'tipoAnuncios'
        });

        anuncio.belongsToMany(models.periodo, {
            through: 'anuncio_periodo',
            foreignKey: 'anuncioId',
        });
    };

    return anuncio;
};
