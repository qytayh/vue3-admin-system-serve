const db = require('../../config/db');
const Sequelize = db.sequelize;
const sequelize =require('sequelize')
const Op = sequelize.Op

// 引入数据表模型
const project = Sequelize.import('../schema/project');
project.sync({ force: false }); //自动创建表

class projectModel {
    /**
     * 创建项目表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createproject(data) {
        return await project.create({
            project: data.project,
            note: data.note
        });
    }

    // 导入项目excel
    static async importProject(data) {
        return await project.findOrCreate({
            where: { project: data.project },
            defaults: data
        }).spread((project, created) => {
            if (created === false) {
                project.update(data)
            }
        })
    }

    static async editproject(data){
        return await project.update(
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
    static async getProjectDetail(obj) {
        return await project.findOne({
            where: {
                ...obj
            }
        });
    }

    static async getProjectList(obj) {
        return await project.findAll({
            where: {
                name: {
                    [Op.like]: `%${obj.name}%`
                },
                num: {
                    [Op.like]: `%${obj.num}%`
                },
                tel: {
                    [Op.like]: `%${obj.tel}%`
                },
            },
            order:  [['createdAt', 'DESC']],
            attributes: { exclude: ['pwd'] }
        });
    }

    static async delProject({id}){
        return await project.destroy({
            where:{
                id: id
              }
        })
    }
}

module.exports = projectModel;