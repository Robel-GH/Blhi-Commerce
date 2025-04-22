<template>
  <div class="product-list container">
    <h1>{{ $t('common.products') }}</h1>
    
    <div class="product-list-container">
      <aside class="sidebar">
        <CategoryFilter />
      </aside>
      
      <main class="products-container">
        <LoadingSpinner v-if="productStore.loading" />
        
        <div v-else-if="productStore.error" class="error-message">
          {{ productStore.error }}
        </div>
        
        <div v-else>
          <div v-if="filteredProducts.length === 0" class="no-products">
            <p>{{ $t('product.no_products_found') }}</p>
          </div>
          
          <div v-else class="product-grid">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product';
import CategoryFilter from '../components/CategoryFilter.vue';
import ProductCard from '../components/ProductCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const productStore = useProductStore();
const selectedCategoryId = ref<number | null>(null);
const searchQuery = ref('');

// Watch for URL query params changes
watch(() => route.query, (query) => {
  selectedCategoryId.value = query.category ? parseInt(query.category as string) : null;
  searchQuery.value = query.search as string || '';
}, { immediate: true });

// Filter products based on selected category and search query
const filteredProducts = computed(() => {
  let filtered = productStore.products;
  
  // Filter by category if one is selected
  if (selectedCategoryId.value) {
    filtered = filtered.filter(product => product.categoryId === selectedCategoryId.value);
  }
  
  // Filter by search query if one exists
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});
</script>

<style scoped>
.product-list {
  padding-top: 1rem;
}

.product-list h1 {
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-align: center;
}

.product-list-container {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.products-container {
  flex: 1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.error-message {
  padding: 2rem;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
  color: var(--error-color);
  text-align: center;
}

.no-products {
  padding: 3rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

@media (max-width: 768px) {
  .product-list-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
}
</style>