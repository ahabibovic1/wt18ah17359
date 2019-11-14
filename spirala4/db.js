const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt2018', 'root', 'root', {host: 'localhost', dialect: 'mysql', logging: false});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.student = sequelize.import(__dirname + '/student.js');
db.godina = sequelize.import(__dirname + '/godina.js');
db.vjezba = sequelize.import(__dirname + '/vjezba.js');
db.zadatak = sequelize.import(__dirname + '/zadatak.js');

//definisanje relacija
db.godina.hasMany(db.student, {foreignKey: 'studentGod', as: 'studenti'}); //1:n

//n:m
db.godina.belongsToMany(db.vjezba, {through: 'godina_vjezba', foreignKey: 'idgodina', as: 'vjezbe'});
db.vjezba.belongsToMany(db.godina, {through: 'godina_vjezba', foreignKey: 'idvjezba', as: 'godine'});

db.vjezba.belongsToMany(db.zadatak, {through: 'vjezba_zadatak', foreignKey: 'idvjezba', as: 'zadaci'});
db.zadatak.belongsToMany(db.vjezba, {through: 'vjezba_zadatak', foreignKey: 'idzadatak', as: 'vjezbe'});

module.exports = db;