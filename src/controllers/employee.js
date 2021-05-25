const employeeModel = require("../modules/employee");
const jwt = require('jsonwebtoken');
const sign = require('../../config/secret')

class employeeController {
    /**
     * 创建人员信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.name) {
            try {
                //创建人员信息模型
                const ret = await employeeModel.createEmployee(req);
                //使用刚刚创建的人员信息ID查询人员信息详情，且返回人员信息详情信息
                const data = await employeeModel.getEmployeeDetail(ret.id);
                ctx.body = {
                    code: 1,
                    msg: '创建成功',
                    data
                }
            } catch (err) {
                ctx.body = {
                    code: 0,
                    msg: '创建失败',
                    data: err
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '参数不齐全'
            }
        }
    }

    static async editEmployee(ctx){
        let req = ctx.request.body;
        if(req.id){
            const data = await employeeModel.editEmployee(req);
            ctx.body = {
                code: 1,
                data
            }
        }else {
            ctx.body = {
                code: 0,
                msg: '参数不齐全'
            }
        }
    }

    static async login(ctx) {
        let req = ctx.request.body;
        if (req.name && req.pwd) {
            try {
                let data = await employeeModel.getEmployeeDetail({ tel: req.name });
                if (data == null) {
                    ctx.body = {
                        code: 0,
                        msg: '账号不存在'
                    }
                }
                if (data.role !== 'admin') {
                    ctx.body = {
                        code: 0,
                        msg: '没有权限登录此系统'
                    }
                } else {
                    if (req.pwd !== data.pwd) {
                        ctx.body = {
                            code: 0,
                            msg: '密码错误'
                        }
                    } else {
                        let payload = {
                            userid: data.id,
                            name: data.name
                        };
                        let options = {
                            expiresIn: '2 days'
                        };
                        let token = jwt.sign(payload, sign, options);
                        ctx.body = {
                            code: 1,
                            msg: '登陆成功',
                            data: {
                                token,
                                name: data.name
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(err, 'err')
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '参数不齐全'
            }
        }

    }

    /**
     * 获取人员详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询人员信息详情模型
                let data = await employeeModel.getEmployeeDetail({ id });
                ctx.response.status = 200;
                ctx.body = {
                    code: 1,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 0,
                    msg: '查询失败',
                    data
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 0,
                msg: '人员ID必须传'
            }
        }
    }

    //所有员工
    static async employeeList(ctx) {
        let req = ctx.request.body;
        try {
            let data = await employeeModel.getEmployeeList(req);
            ctx.body = {
                code: 1,
                data
            }
        } catch (err) {
            console.log(err)
        }
    }


    static async delEmployee(ctx){
        let id = ctx.params.id;
        if(id){
            let data = await employeeModel.delEmployee({id});
            if(data===1){
                ctx.body = {
                    code: 1,
                    data
                }
            }else{
                ctx.body = {
                    code: 0,
                    data
                }
            }
            
        } else {
            ctx.body = {
                code: 0,
                msg: '删除失败'
            }
        }
    }
}

module.exports = employeeController;