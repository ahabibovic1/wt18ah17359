const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const vjezba = sequelize.define('vjezba', {
            naziv: {
                type: Sequelize.STRING,
                unique: true,
                field: 'naziv'
            },
            spirala: {
                type: Sequelize.BOOLEAN,
                field: 'spirala'
            }
        });
    return vjezba;
}