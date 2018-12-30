const router = require('koa-router')()
const articleController = require('../controllers/article')
const userController = require('../controllers/user')


router.prefix('/api')

router
    /* 前端页面路由 */
    .get('/article', articleController.getArticles)                 // 获取文章列表
    .get('/popularArticle', articleController.getPopularArticles)   // 获取热门文章列表
    .get('/article/:id', articleController.getOneArticle)           // 获取单篇文章

    /* 后台管理路由 */
    .post('/login', userController.authLogin)           // 登陆
    .post('/article', articleController.saveArticle)   // 保存(发布)文章




module.exports = router

