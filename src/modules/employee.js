const db = require('../../config/db');
const Sequelize = db.sequelize;
const sequelize =require('sequelize')
const Op = sequelize.Op

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

    static async editEmployee(data){
        return await employee.update(
            data,
        {
            where:{
                id:data.id
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

    static async getEmployeeList(obj) {
        return await employee.findAll({
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

    static async delEmployee({id}){
        return await employee.destroy({
            where:{
                id: id
              }
        })
    }
}

module.exports = employeeModel;