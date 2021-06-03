const Router = require('koa-router')
// 项目
const projectController = require('../controllers/project');
const contentController = require('../controllers/content');
const router = new Router({ prefix: '/api/project' })
/**
 * 项目接口
 */

//获取项目列表
router.post('/projectList',projectController.projectList)
router.post('/project',projectController.projectAdd)
router.delete('/project/:id',projectController.projectDel)
router.put('/project',projectController.editProject)
router.get('/project/:id',projectController.detail)

//施工内容
router.delete('/content/:id',contentController.contentDel)
router.put('/content',contentController.editContent)
router.post('/content',contentController.createContent)

//按负责人
router.get('/contractor',contentController.contractorList)
router.get('/content/:name',contentController.contentList)

 
module.exports = router

