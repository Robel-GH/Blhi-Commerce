<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-text">{{ $t('common.loading') }}</p>
  </div>
</template>

<script setup lang="ts">
// No props needed for this simple component
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(74, 111, 165, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s infinite ease-in-out;
  margin-bottom: 1rem;
}

.loading-text {
  color: var(--primary-color);
  font-size: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>