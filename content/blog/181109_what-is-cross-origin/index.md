---
title:  跨域是什么？
date: "2018-11-09T20:20"
description: 介绍了什么是跨域，以及解决方案。
---

在当你再向另一主机上的文件发送 HTTP 请求时，浏览器会在 Console 里提示如下：

```
XMLHttpRequest cannot load http://xxx.xxx. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://my.app' is therefore not allowed access.
```

提示你当前的行为属于**跨域访问**，出于对网络安全的考量这种类型的访问是被严格禁止的。

#### 什么是跨域？

跨域，其实是指访问了或读取了储存在**不同源的地址**（详见下方文字）下的文件，比如读取 cookie、向其发送 HTTP 请求获取其返回的数据等等。而这种访问其实违反了互联网的安全基石：**同源政策 Same-origin policy**。
同源政策于 1995 年由网景公司提出，该政策最初是为了避免非法获取和操控 DOM 对象（Document Object Model 文档对象模型），而今已拓展到对于全局 JavaScript 对象的保护。
要弄清楚跨域，看来有必要先了解“同源”(Same origin)是什么，同源有 3 个要素，即：

```
**同协议、同域名、同端口**
```

我们平时上网输入的百度网址 www.baidu.com，其实只是网址全称的一部分，即**域名**，**协议**包含：http 超文本传输协议和 https 超文本传输安全协议，**端口号**最常用的是 80 端口，该端口为默认端口一般省略不写。拿百度的网址全名做例子：[https://ws3.sinaimg.cn/large/006tNbRwly1fwz7cguhqmj304x00vjra.jpg]

```
协议：http
域名：www.baidu.com
端口：80（默认端口号，可省）
```

上述 3 个要素只要变一个就被不“同源”或跨域，违反了同源政策，比如：

```
https://www.baidu.com:80
http://baidu.com:80
http://www.baidu.com:81
```

而以下的网址使用的是同一协议（http）、域名（www.baidu.com）、和端口（80）则符合同源，不被视作跨域：

```
http://www.baidu.com/1.html
http:///www.baidu.com/dir/2.html
```

### 为什么禁止跨域访问？

同源政策禁止跨域访问，该政策被视作互联网安全的基石，所有的现代浏览器都遵守该政策，禁止跨域访问。
跨域访问哪儿妨碍了互联网安全了呢？
其实最关键的是，跨域访问可以通过访问不同网站保存在本地的 cookie，而在 cookie 中保存了敏感信息，比如用户登录信息，一旦 cookie 被访问/操纵，意味着第三方能够以用户本人的身份自由的与服务器通信（服务器根本不知道用户数据被盗），因此第三方自由进入你的网银账户，试想：如果有人冒充你本人，去银行转账/查询所有交易记录，或者直接挂失/销户，你是什么感觉？
因此，跨域访问所防范的，其实是恶意网站上的恶意代码，通过其他网站保存在本地的文件（包括 cookie），非法获取用户信息/数据。
现在应该能明白为什么同源政策是互联网安全的基石了：一旦不同源网站能自由访问彼此的文件，后果将不堪设想。

### 另外谈 3 点小东西

1. 为什么跨域访问要由客户端，也就是浏览器来管理，而不是服务器端呢？
   由于这种情况服务器根本无从知晓：一台客户端跨域访问另一台客户端计算机（或者同一客户端上，一个网站读取另一网站储存在本地的 cookie），读取其文件和数据，然后利用获取的信息向服务器发送请求，服务器根本无从分辨发送请求的是谁。
   因此跨域访问或同源政策的实施，必须只能在客户端进行管理。
2. 跨域访问阻止的是什么？
   跨域写（write）是被允许的，因此你的跨域访问信息会被对方接收到，真正被禁止的其实是跨域读（read）。因此跨域请求的响应信息、甚至响应码，我们都是收不到的，因为被浏览器屏蔽掉了。
3. 有跨域读取被允许的现象吗
   其实通过 HTML 的标签跨域载入以下资源（字体除外）是被允许的：图片、CSS 样式表、JS 文件。
   这些文件是通过下载到本地再进行运行的。
   延伸阅读：
   [阮一峰：浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
   [Same-origin policy - Wikipedia](https://en.wikipedia.org/wiki/Same-origin_policy#cite_note-2)
   [Cross-Domain requests in Javascript | jvaneyck](https://jvaneyck.wordpress.com/2014/01/07/cross-domain-requests-in-javascript/)
