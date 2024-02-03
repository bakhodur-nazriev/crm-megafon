<template>
  <spinner-simple></spinner-simple>
  <notify-popup></notify-popup>
  <router-view/>
</template>

<script>

import SpinnerSimple from "@/components/ui-components/SpinnerComponent.vue";
import NotifyPopup from "@/components/ui-components/NotifyPopup.vue";

export default {
  components: {
    SpinnerSimple,
    NotifyPopup,
  },
  data() {
    return {};
  },
  methods: {
    checkAuthorization() {
      if (!localStorage.getItem('authToken')) {
        this.$store.commit('setNotify', {isActive: true, text: 'no auth token', color: 'lightblue'})
        this.$router.push({name: 'login'});
      }
    },
  },
  created() {
    this.checkAuthorization();
  },
};
</script>

<style>
</style>
