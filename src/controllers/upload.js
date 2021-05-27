const employeeModel = require("../modules/employee");
const projectModel = require("../modules/project");
const contentModel = require("../modules/content");

const xlsx = require('node-xlsx');

const options={
    importEmployee:{
        url:'public/uploads/importEmployee'
    },
    importProject:{
        url:'public/uploads/importProject'
    },
}
class upLoadController {
    static async importEmployee(ctx) {
        let name = ctx.req.file.filename
        var list = xlsx.parse(`${options['importEmployee'].url}/${name}`);
        let arr =[]
        for(let i in list[0].data){
            if(i>1){
                let obj = {
                    name:list[0].data[i][1],
                    num:list[0].data[i][2],
                    tel:list[0].data[i][3],
                    note:list[0].data[i][4]||'',
                }
                await employeeModel.importEmployee(obj);
                arr.push(obj)
            }
        }
        ctx.body = {
            code: 1,
            data:{
                arr,
                name,
            }
        }
    }

    static async importProject(ctx){
        let name = ctx.req.file.filename
        var list = xlsx.parse(`${options['importProject'].url}/${name}`);
        for(let i in list[0].data){
            if(i>1){
                let project = list[0].data[i][1]||''
                await projectModel.importProject({project,note:''});
                let pro = await projectModel.getProjectDetail({project})
                let obj = {
                    pid:pro.id,
                    content:list[0].data[i][2]||'',
                    unit:list[0].data[i][3],
                    totalPrice:list[0].data[i][4],
                    contractor:list[0].data[i][5],
                    invoiceNo:list[0].data[i][6],
                    invoiceDate:list[0].data[i][7],
                    iou:list[0].data[i][8],
                    records:list[0].data[i][9],
                    signature:list[0].data[i][10],
                    payWay:list[0].data[i][11],
                    payDesc:list[0].data[i][12],
                    note:''
                }
                await contentModel.createContent(obj);
            }
        }
        let arr = await contentModel.getContentList({});
        ctx.body = {
            code: 1,
            data:{
                arr,
                name,
            }
        }
    }
}

module.exports = upLoadController
