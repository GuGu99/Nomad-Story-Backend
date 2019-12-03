module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('user', {
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
    }, {
        charset: "utf8",
        collate: 'utf8_general_ci'
    });
    // that will add associate 
    return User;
};

