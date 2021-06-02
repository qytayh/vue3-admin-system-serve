const contentModel = require("../modules/content");

class projectController {
  static async createContent(ctx){
    let req = ctx.request.body;
    try{
      const data = await contentModel.createContent(req);
      ctx.body = {
          code: 1,
          data
      }
    }catch (err) {
      ctx.body = {
          code: 0,
          msg: '新增失败',
          data: err
      } 
    }
  }

  static async editContent(ctx) {
    let req = ctx.request.body;
    if(req.id){
        const data = await contentModel.editContent(req);
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

  static async contentDel(ctx) {
    let id = ctx.params.id;
    if (id) {
      let data = await contentModel.delContent({ id });
      if (data === 1) {
        ctx.body = {
          code: 1,
          data,
        };
      } else {
        ctx.body = {
          code: 0,
          data,
        };
      }
    } else {
      ctx.body = {
        code: 0,
        msg: "删除失败",
      };
    }
  }

  static async contractorList(ctx){
    try {
      const data = await contentModel.contractorList()
      let arr =[]
      data.forEach(item => {
          arr.push(item.contractor)
      });
      ctx.body = {
        code: 1,
        data:arr
    }
    } catch (error) {
      console.log(error)
    }
    
  }
}

module.exports = projectController;
