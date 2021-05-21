const Router = require('koa-router')
// 人员
const employeeController = require('../controllers/employee');
const router = new Router({ prefix: '/api/employee' })
/**
 * 人员接口
 */
//创建人员
router.post('/create',employeeController.create);
//获取人员详情
router.get('/:id',employeeController.detail)
//登录
router.post('/login',employeeController.login);

 
module.exports = router