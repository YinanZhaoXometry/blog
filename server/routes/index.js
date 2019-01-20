const router = require('koa-router')()
const userController = require('../controllers/user')
const articleController = require('../controllers/article')
const categoryController = require('../controllers/category')
const commentController = require('../controllers/comment')
const imageController = require('../controllers/image')
const tagController = require('../controllers/tag')
const allowIfLoggedin = require('../middlewares/auth').allowIfLoggedin


router.prefix('/api')

router
    /* 前端页面相关api */
    .get('/articles', articleController.getArticles)                 // 获取文章列表
    .get('/articles/:id', articleController.getOneArticle)           // 获取单篇文章
    .get('/popularArticles', articleController.getPopularArticles)   // 获取热门文章列表
    .get('/comments/:articleId', commentController.getComments)   // 获取xx(id)文章的所有评论
    .post('/comments', commentController.saveComment)  // 保存评论
    .patch('/comments', commentController.saveChildComment) // 保存子评论（在评论document中增加子评论字段）
    .put('/comments/like/:id', commentController.likeComment)         // 对xx(id)评论点赞
    .delete('/comments/like/:id', commentController.dislikeComment)  // 取消点赞
    .put('/articles/like/:id', articleController.likeArticle)            // 对xx(id)文章点赞
    .delete('/articles/like/:id', articleController.dislikeArticle)      // 取消点赞

    /* 后台管理相关api */
    .get('/login', allowIfLoggedin, async ctx => {ctx.body="已登录"})  // 用于检查用户是否登录的api
    .post('/login', userController.login)                               // 登陆
    .get('/logout', allowIfLoggedin, userController.logout)                              // 退出登录 
    .post('/articles', allowIfLoggedin, articleController.saveArticle)                   // 保存(发布)文章
    .patch('/articles', allowIfLoggedin, articleController.updateArticle)                // 修改文章
    .delete('/articles/:id', allowIfLoggedin, articleController.deleteArticle)           // 删除文章
    .post('/categories', allowIfLoggedin, categoryController.saveCategory)               // 增加分类
    .post('/upload/images', allowIfLoggedin, imageController.uploadNewImage)               // 上传图片
    .patch('/upload/images', allowIfLoggedin, imageController.uploadCroppedImage)               // 上传图片
    .post('/tags', tagController.saveTags)       // 添加新标签                          // 获取标签
    // .put('/tags', tagController.renameTag)            
    // .patch('/categories', articleController.updateCategory)            // 修改某分类
    // .delete('/categories/:category', articleController.deleteCategory) // 删除某分类
    
    /* 前端/后台页面共用api */
    .get('/categories', categoryController.getCategories)                // 获取所有分类信息
    .get('/categories/:category', categoryController.getCateArticles)    // 获取某分类下的所有文章
    .get('/tags', tagController.getTags)                                 // 获取所有标签信息
    .get('/tags/:id', tagController.getTagArticles)                     // 获取某标签下的所有文章
    .get('/search', articleController.getSearchArticles)                 // 获取包含搜索关键字的文章

module.exports = router
