# SSR-blog-nuxt-koa-mongo 酷核

个人技术博客项目，前后端分离，服务端渲染，响应式布局。A personal blog system built nuxt-koa-mongo, features SSR
[上线地址](https://kuhe.io)



#### 技术栈：
Vue / Vue Router / Nuxt，Koa2，MongoDB，ElementUI，Less，JWT

#### 介绍：

- 评论组件样式高仿简书，支持使用Web Storage存储用户信息，发布评论不用重复填写用户信息；使用sanitize-html对评论区留言进行过滤，防止XSS攻击
- 评论区头像会根据用户邮箱地址获取Gravatar，如用户未设置Gravatar，则会拉取adorable API的随机头像并显示；博客后台模仿微信公众号UI，制作了封面图片上传和剪裁组件
- 进行了初步的SEO优化；支持https；部署使用CentOS + NginX + PM2；该项目从构想、设计到数据库设计、REST API设计以及前后端的实现，均为本人独立完成


#### 响应式布局
![Imgur](https://i.imgur.com/GR7dfed.gif)


#### 博客管理员后台发表文章时，上传封面图片并剪裁
![Imgur2](https://i.imgur.com/NloO5ut.gif)
