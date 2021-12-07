<template>
  <div>
    <v-app-bar color="teal lighten-3" dense>
      <v-toolbar-title class="white--text">Notebook</v-toolbar-title>

      <NuxtLink class="nuxtlink white--text" to="/">in progress</NuxtLink>
      <NuxtLink class="nuxtlink white--text" to="/done">done</NuxtLink>
      <NuxtLink class="nuxtlink white--text" to="/history">history </NuxtLink>
    </v-app-bar>
  </div>
</template>

<style scoped>
.nuxtlink {
  text-decoration: none;
  margin: 2%;
}
</style>