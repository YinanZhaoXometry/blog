---
title: 【翻译】Web开发必学知识点
date: "2018-10-02T20:40:32.000+08:00"
description: Web开发必学知识点。
---

![Title Picture](./title_picture.png)

> StackExchange 上有一个关于 web 开发中需要注意的知识点的帖子非常火，已经有 2k 的点赞了，非常全也非常好，所以决定翻译出来供大家使用。
> 原文链接：[What should every programmer know about web development?](https://softwareengineering.stackexchange.com/questions/46716/what-technical-details-should-a-programmer-of-a-web-application-consider-before)
> 尽管大多数人对清单中所列都有所耳闻。但是个别的几条可能还没仔细了解过，或者没全弄明白，甚至没听过。

### API 和用户体验：

- 了解浏览器所兼容的标准并非完全一致，保证你的网站能兼容主流浏览器。起码在最新的[Gecko](https://en.wikipedia.org/wiki/Gecko_%28layout_engine%29)引擎（Firefox）、WebKit 引擎（Safari 以及个别移动端浏览器）、Chrome、IE 浏览器（非必须，可使用[“应用兼容性 VPC 镜像”](http://www.microsoft.com/Downloads/details.aspx?FamilyID=21eabb90-958f-4b64-b5f1-73d0a413c8ef&displaylang=en)测试）以及 Opera 中进行测试。还应该考虑在不同操作系统下，浏览器[渲染机制的不同性](http://www.browsershots.org/)。
- 顾及网站的不同使用场景，而不仅仅顾及哪些主流浏览器：手机、读屏软件以及搜索引擎。举例来说，一些无障碍信息：[WAI](http://www.w3.org/WAI/)和[Section508](http://www.section508.gov/)，移动开发：[MobiForge](http://mobiforge.com/)。
- 部署 Staging：如何部署网站更新而不影响用户访问。准备一个或多个测试或 staging 的环境用于架构、代码修改或者内容替换，另外应保证部署过程完全受控且不会带来任何问题。然后通过自动化的将经过测试的代码部署到生产环境中。需使用版本管理工具（git，Subversion 等）以及自动化构建工具（Ant, NAnt, etc.)等，来实现该功能。
- 别把不友好的错误信息直接展示给用户。
- 别把用户的邮箱地址以明文显示出来，防止用户被垃圾邮件骚扰。
- 为用户的链接加上[`rel=nofollow`](https://en.wikipedia.org/wiki/Nofollow)属性，以避免垃圾网站的干扰。
- 为[网站限制设置一些限制条件](http://www.codinghorror.com/blog/archives/001228.html)，这也属于安全范畴。
- 学习如何实现[渐进式增强 Progressive Enhancement](http://www.codinghorror.com/blog/archives/001228.html)。
- POST 请求成功后应进行页面跳转，以避免刷新页面重复提交请求。
- 重点关注无障碍 Accessibility，这永远是个好点子，个别情况也属于[法律要求](http://www.section508.gov/)。可以参考[WAI_ARIA](http://www.w3.org/WAI/intro/aria)和[WCAG 2](http://www.w3.org/TR/WCAG20/)的相关资源。
- 学习[别让我考虑怎么做](http://www.sensible.com/dmmt.html)

### 安全相关

- 需要慢慢消化吸收[OWASP 开发指南](http://www.owasp.org/index.php/Category:OWASP_Guide_Project)，这篇文章所涵盖的 web 安全相关知识非常全面。
- 学习注入攻击以及如何防范，尤其是[SQL 注入](http://en.wikipedia.org/wiki/SQL_injection)。
- 对于用户输入的内容，以及任何通过请求发送的内容（尤其是含有 cookie 和隐式表单数据的请求）要保持警惕。
- 使用“盐”对密码进行哈希加密，对于不同的数据条目使用不同的“盐”，以避免彩虹攻击(rainbow attacks)。使用慢哈希算法储存密码，比如 bcrypt（时间验证）或 scrypt（更强大，同时也较新）（[如果安全的保存密码](http://codahale.com/how-to-safely-store-a-password/)）。避免直接使用 MD5 或 SHA 等类型。
- [不要使用自创的身份验证系统](https://stackoverflow.com/questions/1581610/how-can-i-store-my-users-passwords-safely/1581919#1581919)。尤其在细节上和无法测试等方面很容易出错，甚至只有当你的网站被黑客攻击以后才发现有漏洞。
- 学习处理信用卡的一些规则。（[同时也可以了解一下这个问题](https://stackoverflow.com/questions/51094/payment-processors-what-do-i-need-to-know-if-i-want-to-accept-credit-cards-on-m)）
- 对于用户登陆页面，以及任何需要输入敏感信息（比如信用卡信息）的页面，使用 SSL/HTTPS。[Let's Encrypt](https://letsencrypt.org/)可以提供免费的证书。
- 避免[session 劫持](https://en.wikipedia.org/wiki/Session_hijacking#Prevention)。
- 避免跨站脚本攻击(XSS)。
- 避免跨站请求伪造攻击(CSRF)。
- 避免点击劫持([Clickjacking](https://en.wikipedia.org/wiki/Clickjacking))。
- 保持你的系统里的所有软件为最新版。
- 采取防范措施，保证数据库的连接是安全的。
- 了解最新的攻击手段以及危及你的网站的技术漏洞。
- 学习[Google 浏览器安全手册](https://code.google.com/archive/p/browsersec/)。
- 学习[网络应用黑客手册](http://amzn.com/0470170778)。
- 考虑使用[最小特权原则](https://en.wikipedia.org/wiki/Principle_of_least_privilege)。尝试使用[非 root 账户](https://security.stackexchange.com/questions/47576/do-simple-linux-servers-really-need-a-non-root-user-for-security-reasons)运行你的 app 服务器。（这是一个[tomcat 的示例](http://tomcat.apache.org/tomcat-8.0-doc/security-howto.html#Non-Tomcat_settings)）
- 在所有由用户提供的含有`target="_blank"`的链接中，加上`res="noopener noreferrer"`，以避免目标页面中的 JavaScript 对页面进行重定向，比如重定向至一个伪登陆页面，[更多信息](https://dev.to/phishing)。
- 可以使用[验证内容安全政策(strict Content Security Policy)](https://csp.withgoogle.com/docs/index.html)。

### 性能相关

- 必要时使用缓存，理解并使用[HTTP 缓存特性](http://www.mnot.net/cache_docs/)以及[HTML5 Manifest](http://www.w3.org/TR/2011/WD-html5-20110525/offline.html)。
- 对图片进行优化：不要用 20KB 的图片作为平铺背景。
- 学习如何使用[gzip 等技术](http://developer.yahoo.com/performance/rules.html#gzip)压缩内容。
- 将多个样式表或脚本文件进行合并，以减少浏览器连接/请求的次数，同时设置 gzip 对重复的文件进行压缩。
- 浏览一下[雅虎出色性能](http://developer.yahoo.com/performance/)网站，里面有很多不错的文章，包括如何提升前端性能以及如何使用[YSlow](http://developer.yahoo.com/yslow/)工具（需要 Firefox, Safari, Chrome 或 Opera）。另外，[Google 网页速度](https://developers.google.com/speed/docs/best-practices/rules_intro)（同[浏览器插件一同使用](https://developers.google.com/speed/pagespeed/insights_extensions)）是另一款性能测试工具，它还能对你网站的图片进行优化。
- 使用[SVI sprite 技术]()用于小的彼此相关的图片，比如：工具栏。SVG 上色有些困难，可以看看[这篇文章]()。
- 高访问量的网站应考虑拆分组件并部署在不同的服务器上，比如：
- 静态资源（如：图片、CSS、JS 脚本以及其他不需要 cookie 权鉴才能访问的文件）应部署在一个单独的[不使用 cookie](http://blog.stackoverflow.com/2009/08/a-few-speed-improvements/)的服务器上，这样做是因为在向网站发送的时候，无论是主域名还是其子域名请求都会附带 cookie。这里有个方法是使用 CDN（内容分发网络），但是需注意 CDN 请求可能会失败，这里可以通过使用备用 CDN 或者直接提供本地备份。
- 减少浏览器渲染页面所需要发送 HTTP 请求的总次数。
- 选择一个模板引擎并使用任务管理程序 gulp 或 grunt 进行渲染/预渲染。
- 保证你网站根目录下有一个`favicon.ico`文件。因为即使 HTML 未引入该文件，浏览器还是会自动请求该文件。如果没有`/favicon.ico`文件则会导致大量 404 报错，占用你服务器的带宽。

### SEO（搜索引擎优化）

- 使用搜索引擎友好的 URL，例如：用 `example.com/pages/45-article-title` 而非 `example.com/index.php?page=45`
- 如果使用`#`用于动态内容变化，那么把`#`变为`#!`然后
- 不要使用诸如["请点这儿"](https://ux.stackexchange.com/questions/12100/why-shouldnt-we-use-the-word-here-in-a-textlink)的链接，这样做就是在是浪费 SEO 的机会，这同时也为使用读屏软件的用户带来一些困难。
- 创建一个[XML 网站地图](http://www.sitemaps.org/)，最好将其放在默认位置`/sitemap.xml`。
- 当有多个 URL 指向同一个内容时使用[<link rel="canonical" ... />](http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html)，该问题也可以通过[Google 网络管理员工具](http://www.google.com/webmasters/)进行处理。
- 使用[Google 网络管理员工具](http://www.google.com/webmasters/)和[Bing 网络管理员工具](http://www.bing.com/toolbox/webmaster)。
- 从网站上线开始就安装使用[Google Analytics](http://www.google.com/analytics/)（或者其他开源分析工具如[Piwik](http://piwik.org/)）。
- 了解[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)的作用以及搜索引擎爬虫的工作方式。
- 将`www.example.com`的请求重定向（用`301 Moved Permanently`）至`example.com`（或反过来）以避免两个网址同时占用 Google 排名。
- 了解个别爬虫的工作还是有一定问题的。
- 如果你有一些非文本的内容需要在 Google’s sitemap 中，比如视频。[Tim Farley 回答](https://stackoverflow.com/questions/72394/what-should-a-developer-know-before-building-a-public-web-site#167608)或许可以让你看到很多有价值的东西。

![some picture](./1.jpg)

### 技术相关

- 学习[HTTP 协议](http://www.ietf.org/rfc/rfc2616.txt)，以及 GET、POST、session、cookie 以及“无状态”等概念。
- 让你的[XHTML](http://www.w3.org/TR/xhtml1/)/[HTML](http://www.w3.org/TR/REC-html40/)和[CSS](http://www.w3.org/TR/CSS2/)符合[W3C 规范](http://www.w3.org/TR/)，并确认它们都是[合格的](http://validator.w3.org/)。我们最终的目标是避免浏览器的怪异模式（quiks mode），这也将使得网站对于非标准浏览器（如读屏软件和移动设备）更加友好。
- 学习浏览器是如何处理 JavaScript 的。
- 学习浏览器是如何加载 JavaScript、CSS 样式表和其他资源的，并了解其对视觉上的影响。一般认为[脚本应该放在页面的底部](https://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html)，但分析程序或 HTML5 填充程序属于例外。
- 学习 JavaScript 的沙箱的工作原理，尤其是当你想使用 iframe 时。
- 注意 JavaScript 可以被禁用或者将要被禁用，而 AJAX 将成为插件，而非必须。尽管人们都普遍使用它们，但请注意[NoScript](http://noscript.net/)已经越来越火，移动设备工作方式有所不同，同时 Google 在收录网站的时候并不会运行你的 JavaScript 代码。
- 学习[301 和 302 重定向状态码之间的区别](http://www.bigoakinc.com/blog/when-to-use-a-301-vs-302-redirect/)（这也是一个 SEO 问题）。
- 尽可能的了解你将要的部署平台。
- 考虑使用[“重置样式表”](https://stackoverflow.com/questions/11578819/css-reset-what-exactly-does-it-do)或[normalize.css](http://necolas.github.com/normalize.css/)。
- 考虑使用 JavaScript 框架（例如[jQuery]()，[MooTools](http://mootools.net/)，[Prototype](http://www.prototypejs.org/)，[Dojo](http://dojotoolkit.org/)或[YUI 3](http://developer.yahoo.com/yui/3/)），它们会很好的兼容于不同的浏览器。
- 把视觉效果和 JS 框架合在一起讨论，考虑使用一个 Service，如：[Google Libraries API](http://developers.google.com/speed/libraries/devguide) 来装载框架，这样可以让浏览器可能早就把这个 JS 框架已经 cache 了而不需要再从你的网站上下载了。
- 不要重新造轮子，在开始工作之前找找有没有类似的组件或示例。有 99％的可能性某人已经完成并发布了 OSS 版本的代码。
- 另外，在了解你的需求之前，一开始不要恨不得把 20 个库都用上。尤其是客户端，保持轻量级、快速和灵活性总是更重要的。

### 漏洞修复

- 明白你将花费 20％的时间写编码，80％的时间维护，所以写代码的时候要谨慎。
- 设计一个好的错误报告机制。
- 设计一个入口可以让用户与你取得联系，向你提出建议和批评。
- 写项目文档，这样可以让维护你的软件和系统的人更容易上手。
- 常备份（也确保这些备份有效）！制定备份恢复策略，而不仅仅是备份策略。
- 使用版本控制工具来备份文件，例如：[Subversion](http://subversion.apache.org/)，[Mercurial](http://mercurial.selenic.com/)或[Git](http://git-scm.org/)。
- 别忘了做验收测试。可以使用 Selenium 这样的框架。如需要进行自动化测试，可以使用持续集成工具，例如[Jenkins](http://jenkins-ci.org/)。
- 使用[log4j](http://logging.apache.org/log4j/)，[log4net](http://logging.apache.org/log4net/)或[log4r](http://log4r.rubyforge.org/)等框架，以确保你有足够的日志。如果出了问题，这是可以让你快速找到问题的方式。
- 记录日志时，确保你记录了你捕获了处理和未处理异常。报告和分析日志可以让你知道你网站的问题。

#### 其他

- 实施服务器端和客户端监控和分析（应该是主动的而不是被动的）。
- 使用 UserVoice 和 Intercom（或其他类似的工具）等服务，可以让你和用户保持紧密的联系。
- 遵从[Vincent Driessen](http://nvie.com/about/)的[Git 分支模型](http://nvie.com/posts/a-successful-git-branching-model/)
  这里有多的东西被省略了，不是因为它们没用，而是因为它们要么太细、超出范围，要么对于想要了解自己想知道的知识的人它们有点太宽泛了。文章可能有遗漏或者有错误，所以请随意编辑这篇帖子。
