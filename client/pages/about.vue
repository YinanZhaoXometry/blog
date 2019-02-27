<template>
  <section class="markdown-body">
    <header style="text-align:center;">
      <h1>ABOUT</h1>
    </header>
    <h2>ME</h2>
    <div class="post-body">
      <p style="float:right; padding-left:10px;">
        <img
          width="260"
          src="https://ws4.sinaimg.cn/large/006tNbRwly1fudxr1ao5vj30u0140429.jpg"
          alt="my photo"
        >
      </p>
      <p>姓名：赵一楠</p>
      <p>学历：本科毕业</p>
      <p>80后</p>

      <h3>技术栈：</h3>
      <ul>
        <li>NodeJS、Koa、Express</li>
        <li>Vue、Vue-router、Nuxt、Vuex</li>
        <li>MongoDB(Mongoose)</li>
        <li>HTML5,CSS,JavaScript</li>
      </ul>
      <h3>个人信条：</h3>
      <ul>
        <li>想做一件事情，多晚开始都不算晚。</li>
        <li>多犯错，然后在错误中学习。</li>
      </ul>
    </div>
    <h3>联系方式：</h3>
    <p>
      <i class="iconfont icon-email" />
      <span>邮箱：</span>
      <a href="mailto:zhaoyn7@126.com">
        <span>zhaoyn7@126.com</span>
      </a>
    </p>
    <p>
      <i class="iconfont icon-github" />
      <span>GitHub：</span>
      <a href="https://github.com/zhaoyn7">
        <span>zhaoyn7</span>
      </a>
    </p>
    <h2>PROJECTS</h2>
    <div>
      <b>酷核 kuhe.io</b>
      <p>本项目是个人技术博客项目，分为前端页面展示部分、前端admin文章管理部分和 后端服务部分。</p>
      <p>独立从前端做到后端，所有代码都是自己敲的，自己也是头一回进行了：页面设计、服务器、前端页面、adminUI的搭建过程，在搭建过程中学到很多。</p>
      <p>在项目制作期间，由于对有些方面还不是太熟，抱着学习的态度，参考了几个开源博客项目，自己也从中学到很多：</p>
      <ul>
        <li><a href="https://github.com/jkchao/blog-front" target="blank">jkChao</a>，<a href="https://jkchao.cn/" target="blank">个人博客</a></li>
        <li><a href="https://github.com/warriorBrian/nuxt-blog" target="blank">warriorBrian</a>，<a href="http://www.brianlee.cn/" target="blank">个人博客</a></li>
      </ul>
    </div>
  </section>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'

export default {
  mounted () {
    // 选择性加载 highlight 样式
    hljs.registerLanguage( 'javascript', require('highlight.js/lib/languages/javascript') )
    hljs.registerLanguage( 'typescript', require('highlight.js/lib/languages/typescript') )
    hljs.registerLanguage( 'json', require('highlight.js/lib/languages/json') )
    hljs.registerLanguage( 'css', require('highlight.js/lib/languages/css') )
    hljs.registerLanguage( 'html', require('highlight.js/lib/languages/xml') )
    hljs.registerLanguage( 'bash', require('highlight.js/lib/languages/bash') )
  },

  head () {
    return {
      title: '关于 | 酷核',
    }
  },

  layout: 'about'
}
</script>

<style>
  @import 'github-markdown-css';
  @import 'highlight.js/styles/atom-one-light.css';

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 700px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
