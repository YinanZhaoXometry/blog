export const state = () => ({
  currentComment: {},
  currentSubComment: {}
})

export const mutations = {
  setComment (state, comment) {
    state.currentComment = comment
  },
  setSubComment (state, subComment) {
    state.currentSubComment = subComment
  }
}

export const actions = {
  submitMainComment (context, payload) {
  },

  submitSubComment (context, payload) {
  }
}
