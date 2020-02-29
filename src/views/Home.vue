<template>
  <div class="home">
    <StateDisplay></StateDisplay>
    <v-dialog
      v-model="clearDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Aktuelle Einkausliste wirklich löschen?
        </v-card-title>
        <v-card-text>
          Durch das Bestätigen werden alle Zutaten auf der aktuellen Einkaufsliste gelöscht. <b>Die Liste wird nicht
          archiviert und alle Daten sind unwideruflich verloren.</b> Neu gelernte Zutaten bleiben erhalten.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="clearDialog = false"
          >
            Abbrechen
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            depressed
            @click="clearList"
          >
            Löschen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="nextDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Nächste Einkaufsliste eröffnen?
        </v-card-title>
        <v-card-text>
          Durch das Bestätigen wird die aktuelle Liste archiviert eine neue leere Liste erstellt. Neu gelernte Zutaten bleiben erhalten.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="nextDialog = false"
          >
            Abbrechen
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            depressed
            @click="nextList"
          >
            Nächste Runde
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <List class="list"></List>
    <div id="create">
      <v-speed-dial
        absolute
        v-model="fab"
        bottom
        right
        :direction="'top'"
        :open-on-hover="true"
        :transition="'slide-y-reverse-transition'"
      >
        <template v-slot:activator>
          <router-link to="/add">
            <v-btn v-model="fab" dark fab color="secondary">
              <v-icon color="black">add</v-icon>
            </v-btn>
          </router-link>
        </template>
        <v-btn color="red" fab small dark @click="showClearConfirmationDialog">
          <v-icon>delete_outline</v-icon>
        </v-btn>
        <v-btn color="green" fab small dark @click="showNextDialog">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
  </div>
</template>

<script>
import List from '@/components/List';
import StateDisplay from '@/components/StateDisplay';

export default {
  name: 'Home',
  components: {
    List,
    StateDisplay
  },
  data: () => ({
    clearDialog: false,
    nextDialog: false,
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    transition: 'slide-y-transition'
  }),
  computed: {
    activeFab() {
      switch (this.tabs) {
      case 'one':
        return { class: 'purple', icon: 'account_circle' };
      case 'two':
        return { class: 'red', icon: 'edit' };
      case 'three':
        return { class: 'green', icon: 'keyboard_arrow_up' };
      default:
        return {};
      }
    }
  },
  methods: {
    showClearConfirmationDialog(){
      this.clearDialog = true;
    },
    showNextDialog(){
      this.nextDialog = true;
    },
    clearList(){
      this.$store.dispatch('list/resetList');
      this.clearDialog = false;
    },
    nextList(){
      // TODO
      // this.$store.dispatch('list/resetList');
      this.nextDialog = false;
    },
  }
};
</script>

<style lang="scss">
#create .v-speed-dial {
  a:link {
    text-decoration: none;
    color: inherit;
  }
}

</style>
