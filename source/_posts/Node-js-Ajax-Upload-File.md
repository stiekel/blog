title: 利用Ajax无刷新上传文件到Node.js服务器
date: 2015-01-30 15:08:08
tags: 
  - Node.js
  - JavaScript
  - jQuery
categories:
  - 编程杂记
---

最近做一个垂直社区项目，图片上传是现如今社区的标配，何况面向的还是女性用户。后端使用Node.js，图片上传必然是要不刷新不用iframe了。顺便，也测试了一下[Coding.net](https://coding.net/)的“演示”功能，的确是方便免费够用，代码传上去基本零配置就可以跑起来了。这篇文章涉及的代码托管在Coding上，最终的例子也是运行在Coding的免费服务器上。

## 协议与结构

整个上传采用[RFC1867协议](https://www.ietf.org/rfc/rfc1867.txt)，即基于HTML表单的文件上传协议。借助这个协议，为表单增加`enctype="multipart/form-data"`，再使用`type`为`file`的`input`控制来选择文件，然后便可用POST方法上传文件。

文件上传时会分段提交，借助Connect的[connect-multiparty](https://github.com/andrewrk/connect-multiparty)模块，即可接收各段组合整理为文件，并将文件存到临时目录，我们可再编写其它代码来处理文件。本例中，我们会把文件复制到`public`目录，以提供web访问。

整个示例程序包括以下几部分：

*   HTML表单，负责文件的选择
*   JavaScript组织表单数据，执行上传
*   Node.js接受上传的文件，并负责文件的移动和组织

示例程序的代码托管在Coding上的[Node.js-Ajax-Upload-File](https://coding.net/u/Stiekel/p/Node.js-Ajax-Upload-File/git)，在线演示地址为[node-js-ajax-upload-file.codingapp.com](http://node-js-ajax-upload-file.codingapp.com/)。<!--more-->

下面开工。

## HTML表单组织

表单很简单，就一个文件选择的控件。当`type`为`file`的`input`控件除了常规属性，还包括一个[accept](http://stackoverflow.com/questions/181214/file-input-accept-attribute-is-it-useful)属性，用于定义可以选择的文件类型。

HTML中包括一个表单，一个提交按钮，和一个显示成功上传到服务器的图片的控件，主要代码如下：

```html
      <form class = "form-horizontal" enctype='multipart/form-data' method='post' action='javascript:;' role = "form" id = "frmUploadFile">
        <div class = "form-group">
          <label class = "control-label col-sm-2">上传选择</label>
          <div class = "col-sm-4">
            <input type = "file" name = "files" class = "form-control" />
          </div>
        </div>
        <div class = "form-group">
          <div class = "col-sm-offset-2 col-sm-4">
            <button class = "btn btn-primary" onClick = "uploadFile()">上传</button>
            <span class = "help-inline" id = "spanMessage">选择文件，并上传</span>
          </div>
        </div>
      </form>
      <div class = "row" style = "text-align: center">
        <img id = "imgShow" />
      </div>
```

完整代码请查看[public/index.html](https://coding.net/u/Stiekel/p/Node.js-Ajax-Upload-File/git/blob/master/public/index.html)。

## Ajax执行上传

浏览器端的JavaScript会将表单中的数据格式化，再以POST方法上传文件，为了简便，使用了jQuery库来操作，具体代码比较简单，上传文件，然后根据服务器端的返回判定上传是否成功，如果成功，则显示图片。

代码包装为自定义的函数，由“发送”按钮的单击事件调用，代码如下：

```js
function uploadFile(){
  var formData = new FormData($("#frmUploadFile")[0]);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
      if(200 === data.code) {
        $("#imgShow").attr('src', data.msg.url);
        $("#spanMessage").html("上传成功");
      } else {
        $("#spanMessage").html("上传失败");
      }
      console.log('imgUploader upload success, data:', data);
    },
    error: function(){
      $("#spanMessage").html("与服务器通信发生错误");
    }
  });
}
```

具体请参见文件[pubilc/demo.js](https://coding.net/u/Stiekel/p/Node.js-Ajax-Upload-File/git/blob/master/public/demo.js)。

## Node.js接收文件

通过POST接收到的文件，由`connect-multiparty`负责重新组织为文件，并存储到临时文件夹中，Linux默认为`/tmp`目录，然后再将文件信息放到`req.files`对象中，对象中按`input`的`name`属性来组织文件列表，我们上面的表单中的`input`控件`name`为`files`，所以文件的信息便存储在`req.files.files`中。通过它可获取文件的存储位置和文件名等信息。

整个服务器端的代码很简单，连同注释不过20多行，其中处理请求部分的代码如下：

```js
var multipart = require('connect-multiparty');
app.post('/upload', multipart(), function(req, res){
  //get filename
  var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);
  //copy file to a public directory
  var targetPath = path.dirname(__filename) + '/public/' + filename;
  //copy file
  fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
  //return file url
  res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
});
```

完整代码请参阅[app.js](https://coding.net/u/Stiekel/p/Node.js-Ajax-Upload-File/git/blob/master/app.js)。

## 示例程序的运行

如果系统中已经安装了git，则可以用下面的命令克隆：

```sh
$ git clone https://coding.net/Stiekel/Node.js-Ajax-Upload-File.git
```

也可以[下载zip包](https://coding.net/u/Stiekel/p/Node.js-Ajax-Upload-File/git/archive/master)，程序中的前端包都使用的是百度的公开库，后端代码使用npm管理，进入应用目录，执行如下的命令安装：

```sh
$ npm install
```

然后执行如下的命令可以启动应用：

```sh
$ node app.js
```

再通过浏览器访问`http://ip:3000/`即可。注意，上传的文件会保存在`/tmp`和`public`两个目录中。