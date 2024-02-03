<template>
  <div v-if="isLoading" class="spinner-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
  },

};
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid #3498db;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
