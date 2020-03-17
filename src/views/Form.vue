<template>
  <div class="form">
    <v-progress-linear
      :active="pending"
      :indeterminate="true"
      :query="true"
    ></v-progress-linear>
    <router-link to="/">
      <v-btn id="back" absolute fab top right small dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </router-link>
    <div class="container">
      <v-sheet height="4em"></v-sheet>
      <h1 class="display-3">Zutat hinzufügen</h1>
      <v-sheet height="2em"></v-sheet>
      <Form></Form>
    </div>
    <v-snackbar
      v-model="success"
      :bottom="true"
      :multi-line="true"
      :vertical="true"
      color="success"
      :timeout="5000">
      <span class="body-1">Dein Eintrag wurde hinzugefügt 😊</span>
      <v-btn
        dark
        text
        @click="success = false"
      >
        Schließen
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="failure"
      :bottom="true"
      :multi-line="true"
      :vertical="true"
      color="error"
      :timeout="0">
      <span class="body-1">Konnte deinen Eintrag nicht hinzufügen 🤔</span>
      <small class="caption">Wahrscheinlich solltest du jemandem Bescheid sagen...🧐</small>
      <v-btn
        dark
        text
        @click="failure = false"
      >
        Schließen
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Form
  },
  data: () => ({
    success: false,
    failure: false,
    pending: false,
  }),
  computed: {
    ...mapState({
      addStatus: state => state.list.addStatus,
    }),
  },
  watch: {
    addStatus: function(){
      switch(this.addStatus){
      case 'successful': this.success = true; break;
      case 'failed' : this.failure = true; break;
      case 'pending' : this.pending = true; break;
      default: break;
      }
    },
    success: function() {this.pending = false;},
    pending: function() {this.pending = false;}
  }
};
</script>

<style lang="scss">
h1 {
  margin-bottom: 16px;
}
.container {
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
  padding: 2em;
}

#back {
  z-index: 1000;
}
</style>
