<template>
  <v-form ref="form">
    <v-combobox
      ref="ingredient"
      :clearable="true"
      light
      rounded
      v-model="ingredient"
      outlined
      :rules="[() => !!ingredient || 'Nix gibbet nicht!']"
      label="Zutat, Extrawünsche, Krimskrams"
      :items="this.learned"
      prepend-inner-icon="restaurant"
    ></v-combobox>
    <v-text-field
      ref="price"
      label="Preis"
      placeholder=""
      outlined
      :rules="[v => /^[0-9]*(\.[0-9]*)?$/.test(v) || 'Bitte einen gültigen (nicht-negativen) Preis angeben']"
      rounded
      v-model="price"
      prepend-inner-icon="euro_symbol"
    ></v-text-field>
    <v-btn rounded color="primary" block large @click="submit()">
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
      ingredient: null,
      price: null,
      formHasErrors: false,
    };
  },
  computed: {
    form(){
      return {
        ingredient: this.ingredient,
        price: this.price
      };
    },
    ...mapState({
      addStatus: state => state.list.addStatus,
      getLearnedStatus: state => state.list.getLearnedStatus,
    }),
    ...mapGetters('learned', {
      learned: 'learned',
    })
  },
  methods: {
    submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
      this.add();
    },
    add() {
      if(this.formHasErrors) return;
      let newEntry = {
        'entry': this.ingredient,
        'creator': 'anonymous',
        'price': this.price
      };
      this.$store.dispatch('list/addEntry', newEntry);
      this.$store.dispatch('learned/learn', this.ingredient);
    },
  },
  created() {
    this.$store.dispatch('learned/getLearned');
  },
};
</script>

<style lang="scss" scoped>
button {
  margin: 1em 0;
}
</style>
