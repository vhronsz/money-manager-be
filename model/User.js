const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory');

class User extends Model{}

User.init({
    name:{},
    username:{},
    password:{},
    email:{}
});