// 施工内容
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('content', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        pid:{
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'pid'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'content'
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'unit',
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'totalPrice'
        },
        contractor: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'contractor',
        },
        invoiceNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'invoiceNo',
        },
        invoiceDate:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'invoiceDate',
        },
        iou:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'iou',
        },
        records:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'records',
        },
        signature:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'signature',
        },
        payWay:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'payWay',
        },
        payDesc:{
            type: DataTypes.STRING,
            allowNull: true,
            field: 'payDesc',
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'note',
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}