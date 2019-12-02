export const User = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        user_id : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
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
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
        }
    });
}