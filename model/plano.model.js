module.exports = (sequelize, Sequelize) => {
    const plano = sequelize.define("plano", {
        idPlano: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descPlano: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'Este nome já existe.',
                fields: ['descPlano']
            },
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio',
                    fields: ['descPlano']
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


    plano.afterCreate('sendEmail', async contrato => {
        console.log(contrato);
        console.log('depois de criado');
    });


    plano.associate = models => {

        plano.belongsToMany(models.tipoPlano, {
            through: 'plano_tipoPlano',
            foreignKey: 'planoId',
        });

        plano.belongsToMany(models.periodo, {
            through: 'plano_periodo',
            foreignKey: 'planoId',
        });

        plano.hasMany(models.contrato, {
            foreignKey: 'planoId',
        });
    };

    return plano;
};
