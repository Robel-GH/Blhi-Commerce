<template>
  <h3>H3LLO</h3>
  <header>
    <Navbar />
  </header>
  
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  
  <footer>
    <Footer />
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from './stores/product';
import { useCategoryStore } from './stores/category';
import { useCartStore } from './stores/cart';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();

onMounted(() => {
  // Initialize data
  productStore.fetchProducts();
  categoryStore.fetchCategories();
  cartStore.initializeCart();
});
</script>

<style>
/* Global styles */
:root {
  --primary-color: #4a6fa5;
  --secondary-color: #6d8ddc;
  --text-color: #333333;
  --bg-color: #f8f9fa;
  --accent-color: #ffc107;
  --error-color: #dc3545;
  --success-color: #198754;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

main {
  min-height: calc(100vh - 200px);
  padding: 20px 0;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Utility classes */
.text-center {
  text-align: center;
}

.text-error {
  color: var(--error-color);
}

.text-success {
  color: var(--success-color);
}
</style>