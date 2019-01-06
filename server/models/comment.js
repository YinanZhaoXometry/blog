const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let commentSchema = new mongoose.Schema({
  articleId: { type: ObjectId, required: true},  // 所评论文章的_id
  content: { type: String, required: true, validate: /\S+/ }, // 评论内容
  likes: { type: Number, default: 0 }, // 点赞数
  isAdmin: { type: Boolean, default: false },  // 是否为文章作者
  isTopPinned: { type: Boolean, default: false},  // 是否置顶
  state: { type: Number, default: 1 },  // 状态： 0-未通过 1-通过
  createTime: {}, // 发布日期
  ip: { type: String },  // 评论者ip地址

  /* 评论者信息 */
  fromWhom: {  
    name: { type: String, required: true, validate: /\S+/ },
    email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },
    site: { type: String, validate: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/  }
  },

  /* 子评论 */
  subComments: [  
    {
      isReplyToMain: { type: Boolean },
      content: { type: String, required: true },  // 子评论内容
      createTime: {}, // 发布日期
      state: { type: Number, default: 1 },  // 状态： 0-未通过 1-通过
      isAdmin: { type: Boolean, default: false },  // 是否为文章作者
      fromWhom: {  // 评论者信息
        name: { type: String, required: true, validate: /\S+/ },
        email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },
        site: { type: String, validate: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ }
      },
      toWhom: {   // 被 @ 的评论者信息
        name: { type: String, required: true, validate: /\S+/ },
        email: { type: String, required: true, validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/ },
        site: { type: String, validate: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ }
      },
    }
  ]
})

const commentModel = mongoose.model('commentModel', commentSchema, 'comments')

module.exports = commentModel