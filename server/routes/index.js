const router = require('koa-router')()
const userController = require('../controllers/user')
const articleController = require('../controllers/article')
const categoryController = require('../controllers/category')
const commentController = require('../controllers/comment')
const checkLogin = require('../middlewares/checkLogin').checkLogin

router.prefix('/api')

router
    /* 前端页面路由 */
    .get('/articles', articleController.getArticles)                 // 获取文章列表
    .get('/articles/:id', articleController.getOneArticle)           // 获取单篇文章
    .get('/popularArticles', articleController.getPopularArticles)   // 获取热门文章列表
    .get('/comments/:articleId', commentController.getComments)   // 获取xx(id)文章的所有评论
    .post('/comments', commentController.saveComment)  // 保存评论
    .patch('/comments', commentController.updateComment) // 保存子评论（在评论document中增加子评论字段）
    .put('/comments/like/:id', commentController.likeComment)         // 对xx(id)评论点赞
    .delete('/comments/like/:id', commentController.dislikeComment)  // 取消点赞
    .put('/articles/like/:id', articleController.likeArticle)            // 对xx(id)文章点赞
    .delete('/articles/like/:id', articleController.dislikeArticle)      // 取消点赞

    /* 后台管理路由 */
    .post('/login', userController.login)                               // 登陆
    .get('/logout', checkLogin, userController.logout)                              // 退出登录 
    .post('/articles', checkLogin, articleController.saveArticle)                   // 保存(发布)文章
    .patch('/articles', checkLogin, articleController.updateArticle)                // 修改文章
    .delete('/articles/:id', checkLogin, articleController.deleteArticle)           // 删除文章
    .post('/categories', checkLogin, categoryController.saveCategory)               // 增加分类
    // .patch('/categories', articleController.updateCategory)            // 修改某分类
    // .delete('/categories/:category', articleController.deleteCategory) // 删除某分类
    
    /* 前端 后台 公用路由 */
    .get('/categories', categoryController.getCategories)                // 获取所有分类信息
    .get('/categories/:category', categoryController.getCateArticles)    // 获取某分类下的所有文章
    // .get('/tags', articleController.getTags)                            // 获取标签
    .get('/tags/:tag', articleController.getTagArticles)                     // 获取某标签下的所有文章







module.exports = router

