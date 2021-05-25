const Router = require('koa-router')
const upLoadController = require('../controllers/upload');
// 上传文件
const multer = require('koa-multer')

const router = new Router({ prefix: '/api/upload' })

const storage = multer.diskStorage({
    // 文件保存路径,注意windows和linux系统存储路径写法区别，否则会报404错误
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')//path.resolve('public/uploads') // windows
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

router.post('/importEmployee', upload.single('files'), upLoadController.importEmployee)

module.exports = router