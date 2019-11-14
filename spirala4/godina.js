const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const godina = sequelize.define('godina', {
        nazivGod: {
        type: Sequelize.STRING,
        unique: true,
        field: 'nazivGod'
        },
        nazivRepSpi: {
            type: Sequelize.STRING,
            field: 'nazivRepSpi'
        },
        nazivRepVje: {
            type: Sequelize.STRING,
            field: 'nazivRepVje'
        }
    });
    return godina;
}