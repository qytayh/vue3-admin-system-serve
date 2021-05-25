const db = require('../../config/db');
const Sequelize = db.sequelize;

// 引入数据表模型
const employee = Sequelize.import('../schema/employee');
employee.sync({ force: false }); //自动创建表


class employeeModel {
    /**
     * 创建员工表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createEmployee(data) {
        return await employee.create({
            name: data.name,
            tel: data.tel,
            num: data.num,
            note: data.note
        });
    }

    // 导入员工excel
    static async importEmployee(data) {
        return await employee.findOrCreate({
            where: { num: data.num },
            defaults: data
        }).spread((user, created) => {
            if (created === false) {
                user.update(data)
            }
        })
    }

    /**
     * 查询员工信息的详情
     * @param id 员工信息ID
     * @returns {Promise<Model>}
     */
    static async getEmployeeDetail(obj) {
        return await employee.findOne({
            where: {
                ...obj
            }
        });
    }
}

module.exports = employeeModel;