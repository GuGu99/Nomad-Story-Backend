export const User = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_id : {
            type : DataTypes.STRING,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        secret_key : {
            type : DataTypes.STRING,
            allowNull : false
        },
    });
}