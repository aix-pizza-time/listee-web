<template>
  <v-form>
    <v-autocomplete
      :clearable="true"
      light
      rounded
      v-model="newEntry"
      outlined
      label="Zutat, Extrawünsche, Krimskrams"
    ></v-autocomplete>
    <v-text-field
      label="Preis"
      placeholder=""
      outlined
      rounded
    ></v-text-field>
    <v-btn rounded depressed color="primary" block large @click="add(newEntry)">
      <v-icon>add_shopping_cart</v-icon>Zur Liste hinzufügen
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
      getLearnedStatus: state => state.list.getLearnedStatus,
    }),
    ...mapGetters({
      learned: 'learned',
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
button {
  margin: 1em 0;
}
</style>
