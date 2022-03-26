module.exports = (sequelize, Sequelize) => {
    const tipoDestaque = sequelize.define("tipoDestaque", {
        idTipoDestaque: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descTipoDestaque: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descTipoDestaque']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descTipoDestaque']
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

    tipoDestaque.associate = models => {
        tipoDestaque.belongsTo(models.destaque, {
            foreignKey: 'destaqueId',
            as: 'destaques'
        })
    }

    return tipoDestaque;
};
