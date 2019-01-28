const imageModel = require('../models/image')
const Busboy = require('busboy')
const fs = require('fs')
const crypto = require('crypto')
const config = require('../config')

// 定义工具函数用于生成16进制字符，参数length为需要生成的字符长度
function randomHexValue (length) {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length) // 向randomBytes()传入字节数，返回buffer对象，换算成16进制数以后，一个字节对应2个16进制字符。
}

// 定义工具函数用于生成文件名，参数分别为前缀、后缀名
function generateFileName (prefix, suffix) {
  let name = prefix + Date.now() + '-' + randomHexValue(5) + suffix
  return name
}

// 定义工具函数对新上传的文件重命名
function renameNewImg (filename) {
  let index = filename.lastIndexOf('.')
  let fileType = filename.slice(index)  // 获取后缀名
  let name =  generateFileName ('kuhe-blog-', fileType)
  return name
}

// 定义工具函数对剪裁后的文件重命名
function renameCroppedImg (fieldname, filename) {
  let index = filename.lastIndexOf('.') // 获取文件后缀名的“.”符号的下标
  let bodyName =  filename.slice(0, index)  // 获取裸文件名（不含后缀）
  let fileType = filename.slice(index)  // 获取后缀名
  let name = bodyName + '-' + fieldname + fileType
  return name
}

// 定义工具函数对接收的文件进行重命名、保存在本地磁盘
function handleIncomingImage (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let imageObj = {}
      let opts = {
        headers: ctx.req.headers,
        limits: { fileSize: 1024 * 1024 *10 } // 最大上传10MB图片
      }
      const busboy = new Busboy( opts )
      // 监听file事件，上传初始化
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        // 判断文件格式，如非图片则报错
        let isImage = mimetype.indexOf('image') !== -1
        if (!isImage) { 
          let err = new Error('只能上传图片格式文件');
          err.status = 415
          return reject(err);
        }
        // 监听 file 的limit事件，如上传文件超限则报错
        file.on('limit', function() {
          let err = new Error('上传图片不能超过10MB')
          err.status = 413
          return reject(err)
        })
        // 重命名
        let localFileName = 
          fieldname !== 'web' && fieldname !== 'mobile' 
          ? renameNewImg(filename)
          : renameCroppedImg(fieldname, filename)
        // 获取文件储存路径
        let localFilePath = process.env.NODE_ENV === 'development' 
          ? './public/images/'+ localFileName
          : config.servePath + '/images/' + localFileName
        // 将接收到的file保存在服务器上
        file.on('end', function() {
          switch (fieldname) {
            case 'web': 
              imageObj.name = filename
              imageObj.webName = localFileName
              break
            case 'mobile': 
              imageObj.mobileName = localFileName
              break
            default:
              imageObj.name = localFileName
          }
        })
        file.pipe( fs.createWriteStream(localFilePath) )
      })
      // 监听结束事件
      busboy.on('finish', function () { 
        resolve(imageObj)
        console.log('文件上传成功') 
      })
      ctx.req.pipe(busboy);
    } catch (err) {
      return reject(err) 
    }
  })
}

module.exports = {
  // 上传新图片处理函数
  async uploadNewImage (ctx, next) {
    let imageObj = await handleIncomingImage(ctx)
    let newDoc = new imageModel(imageObj)
    await newDoc.save()
    // 定义返回客户端数据对象
    let data = {
      fileName: imageObj.name,
      url: '/images/' + imageObj.name,
    }
    ctx.response.body = data
  },

  // 上传(对已有图片)经剪裁图片的处理函数
  async uploadCroppedImage (ctx, next) {
    let imageObj = await handleIncomingImage(ctx)
    let conditions = { name: imageObj.name }
    let doc = await imageModel.findOne(conditions, {})
    doc.webName = imageObj.webName
    doc.mobileName = imageObj.mobileName
    savedDoc = await doc.save()
    ctx.body = {
      imageDoc: savedDoc,
      imagePathPrefix: config.imagePathPrefix
    }
  }

}