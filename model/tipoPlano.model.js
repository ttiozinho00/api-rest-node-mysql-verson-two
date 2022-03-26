module.exports = (sequelize, Sequelize) => {
    const tipoPlano = sequelize.define("tipoPlano", {
        idTipoPlano: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descTipoPlano: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descPeriodo']
            }
        },
        valorTipoPlano: {
            type: Sequelize.FLOAT
        },
        desconto: {
            type: Sequelize.FLOAT
        },
        valorTotal: {
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            columnName: 'dataAlteracao',
            field: 'dataAlteracao'
        }
    },

    );

    tipoPlano.associate = models => {

        tipoPlano.belongsToMany(models.plano, {
            through: 'plano_tipoPlano',
            foreignKey: {
                name: 'tipoPlanoId'
            },
        });

        tipoPlano.belongsToMany(models.periodo, {
            through: 'tipoPlano_periodo',
            foreignKey: 'tipoPlanoId',
        });

        tipoPlano.belongsToMany(models.anuncio, {
            through: 'tipoPlano_anuncio',
            foreignKey: "tipoPlanoId",
            as: 'anuncios'
        });

        tipoPlano.belongsToMany(models.destaque, {
            through: 'tipoPlano_destaque',
            foreignKey: "tipoPlanoId",
            as: 'destaques'
        });

    };

    return tipoPlano;
}