module.exports = (sequelize, Sequelize) => {
    const periodo = sequelize.define("periodo", {
        idPeriodo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descPeriodo: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descPeriodo']
            },
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        },
    },

    );

    periodo.associate = models => {
        periodo.belongsToMany(models.plano, {
            through: 'plano_periodo',
            foreignKey: 'periodoId',
        });

        periodo.belongsToMany(models.tipoPlano, {
            through: 'tipoPlano_periodo',
            foreignKey: 'periodoId',
        });

        periodo.belongsToMany(models.anuncio, {
            through: 'anuncio_periodo',
            foreignKey: 'periodoId',
        });

        periodo.belongsToMany(models.destaque, {
            through: 'destaque_periodo',
            foreignKey: 'periodoId',
        });
    };

    return periodo;
}