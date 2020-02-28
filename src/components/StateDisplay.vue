<template>
  <div class="state" v-if="this.display && this.hasErrors">
    <div class="type" v-for="error in this.errors" v-bind:key="error">
      <Notification v-if="this[error] === 'failed'"
        :text="this.codes[error].text"
      ></Notification>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StateDisplay',
  computed: {
    ...mapState({
      getStatus: state => state.list.getStatus,
      addStatus: state => state.list.addStatus,
      resetStatus: state => state.list.resetStatus,
      commitStatus: state => state.list.commitStatus,
      renameStatus: state => state.list.renameStatus
    }),
  },
  data: () => {
    return {
      display: true,
      hasErrors: true,
      errors: [
        'renameStatus', 'commitStatus', 'resetStatus', 'addStatus', 'getStatus'
      ],
      codes: {
        renameStatus: 'Konnte deinen Eintrag nicht umbenennen 🤔',
        commitStatus:'Konnte die Liste nicht finalisieren 🤔',
        resetStatus: 'Konnte die Liste nicht resetten 🤔',
        addStatus: 'Konnte deinen Eintrag nicht hinzufügen 🤔',
        getStatus: 'Konnte die Liste nicht finden 🤔'
      }
    };
  },
  methods: {
    close(){
      this.display = false;
    }
  },
  created(){
    this.hasErrors = (this.getStatus === 'failed' ||
        this.addStatus === 'failed' ||
        this.renameStatus === 'failed' ||
        this.commitStatus === 'failed' ||
        this.resetStatus === 'failed');
  }
};
</script>

<style lang="scss" scoped>
.state {
  display: flex;
  align-items: center;
  padding: 1em;
  width: 100%;
  background: #cc0000;
  color: #ffffff;
  animation-name: fade-in;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  .status {
    flex-grow: 1
  }
  span {
    display: block;
    font-size: 1rem;
    line-height: 1.5;
  }
  small {
    display: block;
  }
  button {
    background: none;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 32px;
    width: 32px;
    transition: background-color ease-out 0.4s;
    line-height: 1;
    font-size: 1em;
    padding: 0;
    &:hover, &:active {
      transition: background-color ease-out 0.1s;
      background-color: #aa0000;
    }
    i {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      vertical-align: middle;
    }
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
