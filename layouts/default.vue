<template>
  <v-app light>
    <AppBar />
    <v-main>
      <v-container class="d-flex justify-start align-start container mt-8">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  .container {
    height: 95vh;
  }
</style>
