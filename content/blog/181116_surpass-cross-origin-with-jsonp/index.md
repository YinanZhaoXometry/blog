---
title: 用JSONP实现跨域AJAX请求
date: "2018-11-16T12:40"
description: 用JSONP实现跨域AJAX请求。
---

![image/题图](https://ws4.sinaimg.cn/large/006tNbRwly1fx9rvoapgvj30u01951l4.jpg)

互联网的同源政策避免了很多安全问题，但是在限制作恶的同时也造成一些不便，比如你想要向自己的服务器发送 AJAX 请求时，却被告知跨域而禁止执行。比如某家大型公司（比如维基百科）有多个子域名：

> wikipedia.com
> en.wikipedia.com
> cn.wikipedia.com
> 它们之间无法进行数据交换，带来了很多不便。如今，为了满足合法的跨域数据交换需求已经有多个方案，最为常用包括 JSONP、CORS 等，今天下先介绍一下 JSONP。

### 如何用 JSONP 实现跨域请求

JSONP 全称——JavaScript Object Notation with Padding 填充式 JSON。JSONP 并不是一种文件格式，而不过是一种对跨域的实现方式的称呼，实际上使用的就是 JSON 格式。
HTML 中 script 元素，可以加载来自“不同源”主机的代码，例如：引入 Vue 框架的 js 文件，尽管脚本文件来自不同源的主机，我们的电脑也一样可以将其下载到本地之后执行：

```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"><script>
```

JSONP 就是利用了 script 元素这一特点：服务器将一段 JS 代码使用字符串的方式“填充”在 JSON 对象中，客户端网页中的 script 元素在收到 JSON 文件后将其解析并立即执行。
上面解释了如何实现跨域传递代码，其实这样就不难理解如何把数据放在代码中一并传递了，其实是在代码中使用了客户端定义好的函数的调用，并在函数调用体内添加了相关数据。下面看看具体的实现步骤。

#### 具体实现

比如客户端、服务器都在本地但是端口号不同，受到同源政策的限制客户端无法向服务器实现跨域请求：

> 客户端：http://localhost:80
> 服务器：http://localhost:3000
> 1）客户端做好接收数据准备
> 在 script 标签中或者 JS 文件中，定义函数 myCallbackFuntion，赋予形参 data。

```
    function myCallback(data){
        var h1=document.createElement("h1");  //创建h1标签用于显示数据
      h1.innerHTML=data.response;            //将数据添加至h1标签内部
      document.body.appendChild(h1);        //将h1标签添加到body中
    }
```

2）服务器端准备好数据
这里用 PHP 作为示例，客户端请求的 PHP 文件 user.php 中加入 header，标识所传输的数据为一段 JS 代码：

```
header("Content-Type:application/javascript")
```

在 user.php 中接收并储存客户端自定义的函数名：

```
$callback=$_REQUEST["callback"]
```

定义$data表示储存需要返回的数据：
$data=["response":"hello world from JSONP!"];
拼接字符串，将数据作为参数放在函数调用体内部，将拼接好的字符串返回客户端：
echo "$callback($data)";
3）客户端发送请求并接收响应
创建一个 script 标签（src=目标主机上请求 URL），在请求 URL 后附上上面定义好的函数名称：

```
<script src="http://localhost/user.php:3000?callback=myCallback”>
```

当 HTML 页面刷新时，浏览器会解析该 script 标签并发送 GET 请求：

```
GET /?callback=myCallback HTTP/1.1
```

当接收到服务器端响应——并非普通 JSON 而是一段 JS 代码：
myCallbackFuntion({"response": "hello world from JSONP!"})
形成了对 myCallbackFunction 函数的调用，并传入了服务器定义的数据作为参数，最终实现了客户端与服务器端的跨域数据传递——服务器端将数据返回客户端，客户端使用数据进行页面渲染见。
总结：
使用 JSONP 实现跨域请求，是通过借由 script 元素（无论是在 HTML 中或者通过 JS 动态添加）通过浏览器发起 GET 请求实现的，如果你需要用到其他 HTTP 请求（比如：POST），则无法使用 JSONP 方法。
补充：
第 3 步的 script 标签只用来发送跨域请求，在 HTML 页面中会显得累赘，最好用后即弃，因此尽量使用 JS 代码动态创建 script，并在请求执行完成后进行移除，具体做法如下：

```
将跨域请求封装成函数
function crossOriginRequest(){
    var script=document.createElement("script"); //创建script元素并添加scr属性
    script.src="http://localhost/user.php:3000?callback=myCallback";
    document.body.appendChild(script);              //在body尾部加入元素
    var lastScript=document.body.querySelector("script:last-child")
                                                    //获取最后添加的script元素
    document.body.removeChild(lastScript);         //移除body尾部的script元素
}
在页面加载时调用跨域请求函数
window.onload=function(){ crossOriginRequest() }
```

1. AJAX-Asynchronous JavaScript And XML（异步 JavaScript 和 XML），一种 web 技术的统称，客户端异步的向服务器端发送请求并从服务器端获取数据。
