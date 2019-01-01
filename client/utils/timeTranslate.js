export default function timeTranslate (ms) {
  var date = new Date(ms)
  var postYear = date.getFullYear()
  var currentYear = new Date().getFullYear()
  if (postYear === currentYear) {
    return (date.getMonth()+1)+"月"+date.getDate()+"日"
  }
  else return postYear+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"
}
