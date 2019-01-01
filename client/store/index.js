const state = () => ({
  articleList: [],
  popularList: [],
  totalArticleCount: 0,

  cateArticleList: [],
  cateArticleCount: 0,
  category: {}
})

const getters = {

}

const mutations = {
  getArticleList (state, {articleList, totalArticleCount}) {
    state.articleList = articleList
    state.totalArticleCount = totalArticleCount
  },

  getPopularList (state, popularList) {
    state.popularList = popularList
  },

  mergeList (state, newList) {
    state.articleList = state.articleList.concat(newList)
  },

  getCateArticleList (state, payload) {
    state.cateArticleList = payload.articleList
    state.category = payload.category
    state.cateArticleCount = payload.cateArticleCount
  },

  mergeCateArticleList (state, payload) {
    state.cateArticleList = state.cateArticleList.concat(payload.articles)
  }

}

const actions = {

}
export {state, mutations}
