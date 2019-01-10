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
  },

  likeArticle (state, articleId) {
    let index = state.articleList.findIndex(element => Object.is(element._id, articleId))
    console.log(index)
    if(index !== -1) state.articleList[index].likes++
  },

  dislikeArticle (state, articleId) {
    let index = state.articleList.findIndex(element => Object.is(element._id, articleId))
    console.log(index)
    if(index !== -1) state.articleList[index].likes--
  }

}

const actions = {

}
export {state, mutations}
