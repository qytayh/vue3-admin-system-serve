const employeeModel = require("../modules/employee");
const xlsx = require('node-xlsx');
class upLoadController {
    static async importEmployee(ctx) {
        let name = ctx.req.file.filename
        var list = xlsx.parse(`public/uploads/${name}`);
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
}

module.exports = upLoadController
