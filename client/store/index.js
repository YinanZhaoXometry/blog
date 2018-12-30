const state = () => ({
  articleList: [],
  popularList: [],
  totalArticleCount: 0
})

const getters = {

}

const mutations = {
  getList (state, {articleList, popularList, totalArticleCount}) {
    state.articleList = articleList
    state.popularList = popularList
    state.totalArticleCount = totalArticleCount
  },

  mergeList (state, newList) {
    state.articleList = state.articleList.concat(newList)
  }
}

const actions = {

}
export {state, mutations}
