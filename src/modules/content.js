const db = require('../../config/db');
const Sequelize = db.sequelize;
const sequelize =require('sequelize')
const Op = sequelize.Op

// 引入数据表模型
const content = Sequelize.import('../schema/content');
content.sync({ force: false }); //自动创建表

class contentModel {
    /**
     * 创建项目表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createContent(data) {
        return await content.create({
            pid:data.pid,
            content: data.content,
            unit:data.unit,
            totalPrice:data.totalPrice,
            contractor:data.contractor,
            invoiceNo:data.invoiceNo,
            invoiceDate:data.invoiceDate||JSON.parse(JSON.stringify(new Date())),
            iou:data.iou,
            records:data.records,
            signature:data.signature,
            payWay:data.payWay,
            payDesc:data.payDesc,
            note: data.note||""
        });
    }

    // 导入项目excel
    static async importContent(data) {
        return await content.findOrCreate({
            where: { content: data.content },
            defaults: data
        }).spread((content, created) => {
            if (created === false) {
                content.update(data)
            }
        })
    }

    static async editContent(data){
        return await content.update(
            data,
        {
            where:{
                id:data.id
            }
        })
    }

    /**
     * 查询项目信息的详情
     * @param id 项目信息ID
     * @returns {Promise<Model>}
     */
    static async getcontentDetail(obj) {
        return await content.findOne({
            where: {
                ...obj
            }
        });
    }

    static async getContentList(obj) {
        return await content.findAll({
            where: {
                // content: {
                    // [Op.like]: `%${obj.content||''}%`
                    ...obj
                // },
            },
            order:  [['createdAt', 'DESC']],
            attributes: { exclude: ['pwd'] }
        });
    }

    static async delContent({id}){
        return await content.destroy({
            where:{
                id: id
              }
        })
    }
}

module.exports = contentModel;