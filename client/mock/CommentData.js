//模拟评论数据
const comment = {
  status: "成功",
  code: 200,
  data: [
    {
      id: '5c3157810cb0543278860876', //主键id CommentID
      date: '2018-07-05 08:30',  //评论时间 created_at
      ownerId: 'talents100020', //文章的id parent_id  目标类型 parent_type

      fromId: 'zhaoyn@126.com',  //评论者id
      fromName: '犀利的评论家',   //评论者昵称
      fromAvatar: 'http://baidu.com', //评论者头像

      likeNum: 3, //点赞人数 likes
      content: '非常靠谱的程序员',  //评论内容
      reply: [  //回复，或子评论
        {
          id: '3452324454512',
          commentId: 'comment0001',
          isReplyToMain: true,

          fromId: 'zhaoyn@1263.com',
          fromName: '清晨一缕阳光',
          fromAvatar: 'http://baidu.com',

          toId: '',
          toName: '',
          toAvatar: '',

          content: '测试评论！',
          date: '2018-07-05 08:50'
        },
        {
          id: '34523244545',  //主键id
          commentId: 'comment0001',  //父评论id，即父亲的id
          isReplyToMain: false,

          fromId: 'zhaoyn@1262.com',  //评论者id
          fromName: '夕阳红',  //评论者昵称
          fromAvatar: 'http://baidu.com', //评论者头像
          toId: 'errhefe232213',  //被评论者id
          toName: '犀利的评论家',  //被评论者昵称
          toAvatar:'http://baidu.com',  //被评论者头像
          content: '赞同，很靠谱，水平很高',  //评论内容
          date: '2018-07-05 08:35'   //评论时间
        },
        {
          id: 'zhaoyn@1261.com',
          commentId: 'comment0001',
          isReplyToMain: false,

          fromId: 'zhaoyn@12226.com',
          fromName: '清晨一缕阳光',
          fromAvatar: 'http://baidu.com',

          toId: 'observer223432',
          toName: '夕阳红',
          toAvatar: 'http://baidu.com',

          content: '大神一个！',
          date: '2018-07-05 08:50'
        },
        {
          id: '345232445425',
          commentId: 'comment00012',
          isReplyToMain: false,

          fromId: 'zhaoyn@12633.com',
          fromName: '清晨一缕阳光2',
          fromAvatar: 'http://baidu.com',

          toId: 'observer223432',
          toName: '夕阳红',
          toAvatar: 'http://baidu.com',

          content: '@夕阳红 大神一个！',
          date: '2018-07-05 08:50'
        }
      ]
    },
    {
      id: '5c309868aa32662303fb133e',
      date: '2018-07-05 08:30',
      ownerId: 'talents100020',
      fromId: 'zhaoyn@133326.com',
      fromName: '毒蛇郭德纲',
      fromAvatar: 'http://baidu.com',
      likeNum: 0,
      content: '从没见过这么优秀的人',
      reply: []
    }
  ]
};

export default comment
