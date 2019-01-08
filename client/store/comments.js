export const state = () => ({
  commentList: [],
})

export const mutations = {
  setCommentList (state, commentList) {
    state.commentList = commentList
  }
}

export const actions = {
  async fetchCommentList ({commit}, articleId) {
    let {data} = await this.$axios.get('/api/comments', { params: {articleId} })
    if (data.success) {
      commit('setCommentList', data.comments)
    } else {

    }
  }
}
