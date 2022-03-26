module.exports = (sequelize, Sequelize) => {

    const destaque = sequelize.define("destaque", {
        idDestaque: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descDestaque: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descDestaque']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descDestaque']
                },
            },
        },
        qtdeMinDestaque: {
            type: Sequelize.INTEGER
        },
        qtdeDestaque: {
            type: Sequelize.INTEGER
        },
        valorUnitDestaque: {
            type: Sequelize.FLOAT
        },
        valorTotalDestaque: {
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            columnName: 'dataAlteracao',
            field: 'dataAlteracao'
        }
    },

    );

    destaque.associate = models => {

        destaque.belongsToMany(models.tipoPlano, {
            through: 'tipoPlano_destaque',
            foreignkey: 'destaqueId',
            as: 'tipoPlanos'
        });

        destaque.belongsToMany(models.periodo, {
            through: 'destaque_periodo',
            foreignKey: 'destaqueId',
        });

        destaque.hasOne(models.tipoDestaque, {
            foreignKey: {
                name: 'destaqueId'
            },
            as: 'tipoDestaques'
        });
    };

    return destaque;
};