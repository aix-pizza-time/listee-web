<template>
  <div class="form">
    <router-link to="/">
      <v-btn id="back" absolute dark fab top right small color="primary">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </router-link>
    <v-sheet height="4em"></v-sheet>
    <h1 class="display-4">Zutat hinzufügen</h1>
    <v-sheet height="2em"></v-sheet>
    <Form></Form>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  components: {
    Form
  }
};
</script>

<style>
h1 {
  margin-bottom: 16px;
}
.form {
  padding: 2em;
}
#back {
  z-index: 1000;
}
</style>
