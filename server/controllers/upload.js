const Busboy = require('busboy')
const fs = require('fs')

module.exports = {
  async handleImageUpload (ctx, next) {
    let opts = {
      headers: ctx.req.headers,
      limits: { fileSize: 1024 * 1024 *10 } // 最大允许上传10MB的图片
    }
    const busboy = new Busboy( opts )
    const uploadProcess = new Promise((resolve, reject) => {
        let saveFileName
        // 监听file事件，表示上传初始化
        busboy.on('file', function (fieldname, stream, filename, encoding, mimetype) {
          try {
            let isImage = mimetype.indexOf('image') !== -1
            if (!isImage) { 
              let err = new Error('只能上传图片格式文件');
              err.status = 415
              return reject(err);
            }
            let indexStart = filename.lastIndexOf('.')
            let fileType = filename.substring(indexStart)
            saveFileName = 'kuhe-blog-' + Date.now() + fileType
            let saveFilePath = './public/images/'+ saveFileName
            // 将接受到的stream以文件的形式，保存在服务器上
            stream.pipe( fs.createWriteStream(saveFilePath) )
            stream.on('limit', function() {
              let err = new Error('上传图片不能超过10MB')
              err.status = 413
              return reject(err)
            })
          } catch (err) { return reject(err) }
        })
        // 定义返回客户端数据对象
        let data = {
          message: '文件上传成功', 
          url: 'http://localhost:3030/images/' + saveFileName
        }
        // 监听结束事件
        busboy.on('finish', function () { resolve(data) })
        ctx.req.pipe(busboy);
    })
      let data = await uploadProcess
      ctx.response.body = data
  }
}