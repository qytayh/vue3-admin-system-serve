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

//员工列表
router.post('/employeeList',employeeController.employeeList);

router.put('/edit',employeeController.editEmployee);

router.delete('/:id',employeeController.delEmployee);

 
module.exports = router

