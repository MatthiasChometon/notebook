<template>
  <div>
    <div v-if="!done" class="d-inline-flex">
      <v-text-field
        v-model="newNoteDescription"
        class="mr-4 note-text-field"
        label="new note"
      ></v-text-field>
      <v-btn
        :disabled="newNoteDescription === ''"
        class="white--text ma-4"
        color="teal lighten-3"
        elevation="2"
        @click="addNote()"
        >create</v-btn
      >
    </div>
    <div class="d-flex flex-wrap">
      <v-card v-for="note in notes" :key="note.id" class="ma-2" max-width="344">
        <v-card-title> {{ note.description }} </v-card-title>

        <v-card-subtitle>
          created the : {{ note.creationDate }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            class="white--text ma-4"
            elevation="2"
            color="teal lighten-3"
            @click="changeDoneNote(note)"
          >
            <div v-if="note.done">uncomplete</div>
            <div v-else>complete</div>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text ma-4"
            elevation="2"
            color="red lighten-3"
            @click="deleteNote(note)"
            >delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-alert v-if="notes.length === 0" border="top" color="red lighten-3" dark>
      <div v-if="done">no notes done</div>
      <div v-else>no notes in progress</div>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    done: {
      type: Boolean,
      defaultValue: false,
      required: true,
    },
  },
  data() {
    return {
      notes: [],
      newNoteDescription: '',
    }
  },
  async created() {
    const dbNotes = await this.$fire.firestore
      .collection('matthias-note')
      .where('done', '==', this.done)
      .get()
    this.notes = dbNotes.docs.map((dbNote) => {
      return { ...dbNote.data(), id: dbNote.id }
    })
  },
  methods: {
    async deleteNote(noteToDelete) {
      this.notes = this.notes.filter((note) => {
        return note.id !== noteToDelete.id
      })
      await this.$store.dispatch('deleteNote', noteToDelete)
    },
    async addNote() {
      let newNote = {
        description: this.newNoteDescription,
        creationDate: new Date().toString(),
        done: false,
      }
      newNote = await this.$store.dispatch('addNote', newNote)
      this.notes.push(newNote)
      this.newNoteDescription = ''
    },
    async changeDoneNote(noteToUdpate) {
      this.notes = this.notes.filter((note) => {
        return note.id !== noteToUdpate.id
      })
      await this.$store.dispatch('updateNote', {
        data: noteToUdpate,
        payload: { done: !noteToUdpate.done },
      })
    },
  },
}
</script>
