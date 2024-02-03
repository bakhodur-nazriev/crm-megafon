<template>
  <div v-if="on" class="notification-popup" :style="{ background: clr }">
    <div class="popup-content">
      {{ txt }}
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      on: false,
      txt: 'oooooops...',
      clr: 'blue',
    };
  },
  computed: {
    notify() {
      return this.$store.getters.getNotify;
    },
  },
  watch: {
    notify(newVal) {
      this.on = this.$store.getters.getNotify.isActive;
      this.txt = this.$store.getters.getNotify.text;
      this.clr = this.$store.getters.getNotify.color;

      if (newVal) {
        setTimeout(() => {
          this.$store.commit('setNotify', { isActive: false});
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.notification-popup {
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 5%;
  width: 10rem;
  height: 2.125em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.popup-content {
  color: white;
  font-size: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
