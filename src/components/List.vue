<template>
  <div class="list">
    <h2 class="failed" v-if="getStatus === 'failed'">
      <Notification
        :text="'Irgendwas ist schiefgelaufen... 😤'"
        :note="'Wir arbeiten so schnell wie möglich an einer Lösung 👨‍💻'"
      ></Notification>
       <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </h2>
    <v-card outlined flat v-else>
      <v-list-item v-if="this.list.length == 0">
        <v-list-item-content>
          <v-list-item-title class="text-center">
            Momentan soll nichts gekauft werden 🙄
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div v-else>
        <v-list-item three-line v-for="item in list" :key="item.id" @click="startEditing(item)">
          <v-list-item-content>
            <v-list-item-title class="title font-weight-bold" @click="startEditing(item)">
              {{item.entry}}
            </v-list-item-title>
            <v-list-item-subtitle @click="startEditing(item)">
              Hinzugefügt von: {{item.creator}}
            </v-list-item-subtitle>
            <v-list-item-subtitle @click="startEditing(item)">
              Preis: {{item.price}} &euro;
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
    <v-bottom-sheet v-model="currentlyEditing" persistent>
      <v-sheet>
        <v-form v-if="editedEntry !== null" class="bottom-form">
          <v-text-field
            v-model="editedEntry.entry"
            placeholder="Zutat"
            outlined
            rounded
            label="Zutat"
            prepend-inner-icon="restaurant"
          ></v-text-field>
          <v-text-field
            v-model="editedEntry.price"
            placeholder="Preis"
            outlined
            rounded
            label="Preis"
            prepend-inner-icon="euro_symbol"
          ></v-text-field>
          <v-text-field
            v-model="editedEntry.creator"
            disabled
            placeholder="Hinzugefügt von"
            outlined
            rounded
            label="Hinzugefügt von"
            prepend-inner-icon="person"
            dense
          >
          </v-text-field>
          <v-container>
            <v-row :justify="'start'" no-gutter>
              <v-col cols="12" sm="8">
                <v-btn rounded dark large color="red" @click="deleteItem">
                  <v-icon>delete</v-icon> Löschen</v-btn>
              </v-col>
              <v-col cols="12" sm="4" >
                <v-btn @click="saveChanges" block rounded large color="success" dark>
                  <v-icon>save</v-icon>Speichern &amp; Schließen</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Notification from '@/components/Notification.vue';

export default {
  name: 'List',
  components: {
    Notification
  },
  data () {
    return {
      editedEntry: null,
      currentlyEditing: false,
    };
  },
  computed: {
    ...mapState({
      getStatus: state => state.list.getStatus,
      deleteStatus: state => state.list.deleteStatus,
      renameStatus: state => state.list.renameStatus,
      resetState: state => state.list.resetState,
      nextState: state => state.list.nextState,
    }),
    ...mapGetters('list', {
      list: 'list',
    }),
  },
  methods: {
    deleteItem(){
      if(this.editedEntry == '') return;

      this.$store.dispatch('list/deleteEntry', {id: this.editedEntry.id});
      this.editedEntry = null;
      this.currentlyEditing = false;
    },
    startEditing(item){
      this.editedEntry = item;
      this.currentlyEditing = true;
    },
    saveChanges(){
      if(this.editedEntry == '') return;
      let newEntry = {
        id: this.editedEntry.id,
        entry: this.editedEntry.entry,
        creator: this.editedEntry.creator,
        price: this.editedEntry.price,
      };
      this.$store.dispatch('list/changeEntry', newEntry);
      this.currentlyEditing = false;
      this.editedEntry = null;
    }
  },
  created() {
    this.$store.dispatch('list/getList');
  },
};
</script>

<style lang="scss" scoped>
.v-progress-circular--indeterminate {
  text-align: center;
  margin: 4em auto;
  display: block;
}

.list {
  position: relative;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 2em 1em;
}
.bottom-form {
  padding: 2em;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto
}
</style>
