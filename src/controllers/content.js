const contentModel = require("../modules/content");

class projectController {
  static async createContent(ctx) {
    let req = ctx.request.body;
    try {
      const data = await contentModel.createContent(req);
      ctx.body = {
        code: 1,
        data,
      };
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: "新增失败",
        data: err,
      };
    }
  }

  static async editContent(ctx) {
    let req = ctx.request.body;
    if (req.id) {
      const data = await contentModel.editContent(req);
      ctx.body = {
        code: 1,
        data,
      };
    } else {
      ctx.body = {
        code: 0,
        msg: "参数不齐全",
      };
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

  static async contentList(ctx) {
    let name = ctx.params.name;
    if (name) {
      try {
        let data = await contentModel.getContentListGroup({ contractor: name })
        // let arr = []
        // let pidList = Array.from(new Set(sq1.map(v=> v.pid)))
        // pidList.forEach(v=>{
        //   let carr = sq1.filter(i=>{
        //     return v==i.pid
        //   })
        //   let {project} = carr[0]
        //   let totalPrice=0
        //   let contentList=carr.map(data=>{
        //     totalPrice =totalPrice+data.totalPrice
        //     return {
        //       id:data.id,
        //       content: data.content,
        //       unit: data.unit,
        //       totalPrice: data.totalPrice,
        //       contractor: data.contractor,
        //       invoiceNo: data.invoiceNo,
        //       invoiceDate: data.invoiceDate,
        //       iou: data.iou,
        //       records: data.records,
        //       signature: data.signature,
        //       payWay: data.payWay,
        //       payDesc: data.payDesc,
        //       note: data.note,
        //     }
        //   })
        //   let obj = {
        //     ...project,
        //     totalPrice:totalPrice,
        //     contentList:contentList
        //   }
        //   arr.push(obj)
        // })
        ctx.body = {
          code: 1,
          data,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  static async contractorList(ctx) {
    try {
      const data = await contentModel.contractorList();
      let arr = [];
      data.forEach((item) => {
        arr.push(item.contractor);
      });
      ctx.body = {
        code: 1,
        data: arr,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = projectController;
