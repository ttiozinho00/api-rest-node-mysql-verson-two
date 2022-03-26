module.exports = (sequelize, Sequelize) => {
    const fluxoAprovacao = sequelize.define("fluxoAprovacao", {
        idFluxoAprovacao: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        statusFluxoAprovacao: {
            type: Sequelize.ENUM,
            values: ['Em analise', 'Ajustes', 'Aprovado', 'Reprovado']
        },
        dataStatus: {
            type: Sequelize.DATEONLY,
            get: function () {
                return moment.utc(this.getDataValue('dataStatus')).format('DD-MM-YYYY');
            }
        },
        inicioVigencia: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
            get: function () {
                return moment.utc(this.getDataValue('inicoVigencia')).format('DD-MM-YYYY');
            }
        },
        fimVigencia: {
            type: Sequelize.DATEONLY,
            get: function () {
                return moment.utc(this.getDataValue('fimVigencia')).format('DD-MM-YYYY');
            }
        },
        informacaoAjuste: {
            type: Sequelize.STRING(255)
        },
        emailFluxoAprovacao: {
            type: Sequelize.STRING(255)
        },
        versao: {
            type: Sequelize.INTEGER
        },
        ativo: {
            type: Sequelize.BOOLEAN
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

    )

    return fluxoAprovacao;
}