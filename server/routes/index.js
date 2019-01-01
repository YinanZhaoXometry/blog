const router = require('koa-router')()
const userController = require('../controllers/user')
const articleController = require('../controllers/article')
const categoryController = require('../controllers/category')

router.prefix('/api')

router
    /* 前端页面路由 */
    .get('/article', articleController.getArticles)                 // 获取文章列表
    .get('/popularArticle', articleController.getPopularArticles)   // 获取热门文章列表
    .get('/article/:id', articleController.getOneArticle)           // 获取单篇文章

    /* 后台管理路由 */
    .post('/login', userController.authLogin)                          // 登陆
    .post('/article', articleController.saveArticle)                   // 保存(发布)文章
    .patch('/article', articleController.updateArticle)                // 修改文章
    .delete('/article/:id', articleController.deleteArticle)           // 删除文章
    .post('/categories', categoryController.saveCategory)               // 增加分类
    // .patch('/categories', articleController.updateCategory)            // 修改某分类
    // .delete('/categories/:category', articleController.deleteCategory) // 删除某分类
    
    /* 前端 后台 公用路由 */
    .get('/categories', categoryController.getCategories)                // 获取所有分类信息
    .get('/categories/:category', categoryController.getCateArticles)    // 获取某分类下的所有文章
    // .get('/tags', articleController.getTags)                            // 获取标签
    // .get('/tags/:tags', articleController.getTagArticles)                     // 获取某标签下的所有文章







module.exports = router

