<template>
  <div class="home">
    <StateDisplay></StateDisplay>
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
        <v-btn color="red" fab small dark>
          <v-icon>delete_outline</v-icon>
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
