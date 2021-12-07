export const state = () => ({
  history: []
})

export const mutations = {
  addToHistory(state, newHistoryLine) {
    if (state.history.length === 10) state.history.shift()
    state.history.push(newHistoryLine)
  }
}

export const actions = {

  async deleteNote({ commit }, noteToDelete) {
    await this.$fire.firestore
      .collection('matthias-note')
      .doc(noteToDelete.id)
      .delete()
    commit('addToHistory', {
      color: 'teal lighten-3',
      description: `deleted the note  ${noteToDelete.description}`,
    })
  },

  async addNote({ commit }, newNote) {
    const dbNewNote = await this.$fire.firestore
      .collection('matthias-note')
      .add(newNote)

    commit('addToHistory', {
      color: 'teal lighten-3',
      description: `added the note ${newNote.description}`,
    })

    return { ...newNote, id: dbNewNote.id }
  },

  async updateNote({ commit }, noteToUdpate) {
    await this.$fire.firestore
      .collection('matthias-note')
      .doc(noteToUdpate.data.id)
      .update(noteToUdpate.payload)

    commit('addToHistory', {
      color: 'teal lighten-3',
      description: `changed to ${!noteToUdpate.data.done} the note ${noteToUdpate.data.description}`,
    })
  }
}

export const getters = {
  getHistory(state) {
    return state.history.slice().reverse()
  }
}
