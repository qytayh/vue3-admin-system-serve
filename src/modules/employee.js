const db = require('../../config/db');
const Sequelize = db.sequelize;
 
// 引入数据表模型
const employee = Sequelize.import('../schema/employee');
employee.sync({force: false}); //自动创建表


class employeeModel {
    /**
     * 创建员工表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createEmployee(data){
        return await employee.create({
            name: data.name, 
            pwd: data.pwd,  
            tel: data.tel, 
            role: data.role 
        });
    }
 
    /**
     * 查询员工信息的详情
     * @param id 员工信息ID
     * @returns {Promise<Model>}
     */
    static async getEmployeeDetail(obj){
        return await employee.findOne({
            where:{
                ...obj
            }
        });
    }
}
 
module.exports = employeeModel;