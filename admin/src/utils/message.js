import { Message, MessageBox } from 'element-ui';

export default {
  // 成功
  success (content) {
    Message({ showClose: true, message: content, type: 'success' })
  }, 
  // 报错
  error (content) {
    Message({ showClose: true, message: content, type: 'error' })
  },
  // 警告
  warn (content) {
    Message({ showClose: true, message: content, type: 'warning' })
  },
  // 普通消息（通知)
  nomal (content) {
    Message({ showClose: true, message: content })
  },
  // 提示框
  alert (content, type) {
    return MessageBox({
      title: '提示',
      message: content,
      confirmButtonText: '确定',
      center: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: type
    })
  },
  // 提醒确认框
  confirmWarn (content) {
    return MessageBox({
      title: '提示',
      message: content,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
  },
  // 确认框
  confirm (content) {
    return MessageBox({
      title: '提示',
      message: content,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: "取消",
      type: "success",
      center: true
    })
  },
  // 提示输入框
  prompt (content) {
    return MessageBox({
      title: '提示',
      message: content,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: "取消",
      showInput: true,
      center: true
    })
  },
}