const auth = {
  checkLogin: function  () {
    if (!window.localStorage.getItem('isUserLogin')) return false
    return true
  }
}

export default auth
