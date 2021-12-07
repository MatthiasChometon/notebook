<template>
  <div>
    <v-alert
      v-for="(historyLine, index) in $store.getters['getHistory']"
      :key="index"
      outlined
      :color="historyLine.color"
      >{{ historyLine.description }}</v-alert
    >
    <v-alert
      v-if="$store.getters['getHistory'].length === 0"
      border="top"
      color="red lighten-3"
      dark
    >
      no history
    </v-alert>
  </div>
</template>
