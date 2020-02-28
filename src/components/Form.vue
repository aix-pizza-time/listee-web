<template>
  <v-form>
    <v-autocomplete
      clearable="true"
      light
      rounded
      v-model="newEntry"
      filled
      label="Zutat, Extrawünsche, Krimskrams"
    ></v-autocomplete>
    <v-btn rounded depressed color="primary" block large @click="add(newEntry)">
      <v-icon>add_shopping_cart</v-icon>Zur Liste hinzufügen
    </v-btn>
    <div class="spacer"></div>
    <!-- <v-btn rounded depressed color="error" block normal @click="reset()(newEntry)">
      <v-icon>delete_outline</v-icon>Liste zurücksetzen
    </v-btn> -->
  </v-form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {},
  name: 'Form',
  data: () => {
    return {
      newEntry: '',
      eventDisplay: false
    };
  },
  computed: {
    ...mapState({
      addStatus: state => state.list.addStatus,
      resetStatus: state => state.list.resetStatus
      // commitStatus: state => state.list.commitStatus
    })
  },
  methods: {
    add(entry) {
      this.newEntry = '';
      this.$store.dispatch('list/addEntry', { entry });
    },
    // commit() {
    //   this.$store.dispatch('list/commitList');
    // },
    reset() {
      this.$store.dispatch('list/resetList');
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 2em;
}

button {
  margin: 1em 0;
}
</style>
