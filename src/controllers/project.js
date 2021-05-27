const projectModel = require("../modules/project");

class projectController {
    /**
     * 创建项目信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async projectAdd(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.project) {
            try {
                //创建项目信息模型
                const ret = await projectModel.createProject(req);
                //使用刚刚创建的项目信息ID查询项目信息详情，且返回项目信息详情信息
                const data = await projectModel.getProjectDetail(ret.id);
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

    static async editProject(ctx){
        let req = ctx.request.body;
        if(req.id){
            const data = await projectModel.editProject(req);
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

    /**
     * 获取项目详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询项目信息详情模型
                let data = await projectModel.getProjectDetail({ id });
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
                msg: '项目ID必须传'
            }
        }
    }

    //所有项目
    static async projectList(ctx) {
        let req = ctx.request.body;
        try {
            let data = await projectModel.getProjectList(req);
            ctx.body = {
                code: 1,
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async projectDel(ctx){
        let id = ctx.params.id;
        if(id){
            let data = await projectModel.delProject({id});
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

    static async projectEdit(ctx){

    }



    
}

module.exports = projectController;