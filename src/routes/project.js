const Router = require('koa-router')
// 项目
const projectController = require('../controllers/project');
const router = new Router({ prefix: '/api/project' })
/**
 * 项目接口
 */

//获取项目列表
router.post('/projectList',projectController.projectList)
router.post('/project',projectController.projectAdd)
router.delete('/project/:id',projectController.projectDel)
router.put('/project',projectController.projectEdit)

 
module.exports = router

