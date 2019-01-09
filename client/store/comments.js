export const state = () => ({
  commentList: [],
})

export const mutations = {
  setCommentList (state, commentList) {
    state.commentList = commentList
  },
  likeComment (state, commentId) {
    let index = state.commentList.findIndex(element => Object.is(element._id,commentId))
    if(index !== -1) state.commentList[index].likes++
  },
  dislikeComment (state, commentId) {
    let index = state.commentList.findIndex(element => Object.is(element._id,commentId))
    if(index !== -1) state.commentList[index].likes--
  }
}

export const actions = {
  async fetchCommentList ({commit}, articleId) {
    let {data} = await this.$axios.get(`/api/comments/${articleId}`)
    if (data.success) {
      commit('setCommentList', data.comments)
    }
  },


}
