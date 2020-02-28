<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="true"
    :multi-line="true"
    :vertical="true"
    color="error"
    :timeout="this.timeout">
    <span class="body-1">{{this.text}}</span>
    <small class="caption">{{this.note}}</small>
    <v-btn
      dark
      text
      @click="snackbar = false"
    >
      Schließen
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: 'Wahrscheinlich solltest du jemandem Bescheid sagen...🧐'
    },
  },
  data () {
    return {
      snackbar: true,
      timeout: 0,
    };
  },
};
</script>
