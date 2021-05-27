const Router = require('koa-router')
const upLoadController = require('../controllers/upload');
// 上传文件
const multer = require('koa-multer')

const router = new Router({ prefix: '/api/upload' })

const options={
    importEmployee:{
        url:'public/uploads/importEmployee'
    },
    importProject:{
        url:'public/uploads/importProject'
    },
}


router.post('/importEmployee', createUpload(options['importEmployee']), upLoadController.importEmployee)
router.post('/importProject', createUpload(options['importProject']), upLoadController.importProject)


function createUpload(op){
    const storage = multer.diskStorage({
        // 文件保存路径,注意windows和linux系统存储路径写法区别，否则会报404错误
        destination: function (req, file, cb) {
            cb(null, op.url)//path.resolve('public/uploads') // windows
            // cb(null, '/usr/local/themesui-server/public/uploads') // linux
        },
        //修改文件名称
        filename: function (req, file, cb) {
            const fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 20 // 限制15M
        }
    });
    return upload.single('files')
}

module.exports = router