<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>{{ $t('home.welcome') }}</h1>
          <p>{{ $t('home.shop_now') }}</p>
          <router-link to="/products" class="cta-button">{{ $t('common.products') }}</router-link>
        </div>
      </div>
    </section>

    <section class="featured-products container">
      <h2>{{ $t('home.featured_products') }}</h2>
      
      <LoadingSpinner v-if="productStore.loading" />
      
      <div v-else-if="productStore.error" class="error-message">
        {{ productStore.error }}
      </div>
      
      <div v-else class="product-grid">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>
    </section>

    <section class="categories container">
      <h2>{{ $t('home.popular_categories') }}</h2>
      
      <LoadingSpinner v-if="categoryStore.loading" />
      
      <div v-else-if="categoryStore.error" class="error-message">
        {{ categoryStore.error }}
      </div>
      
      <div v-else class="category-grid">
        <div 
          v-for="category in categoryStore.categories" 
          :key="category.id"
          class="category-card"
          @click="navigateToCategory(category.id)"
        >
          <h3>{{ category.name }}</h3>
          <p v-if="category.description">{{ category.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCategoryStore } from '../stores/category';
import ProductCard from '../components/ProductCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();

// Get a subset of products to feature on the homepage
const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4);
});

const navigateToCategory = (categoryId: number) => {
  router.push({
    path: '/products',
    query: { category: categoryId.toString() }
  });
};
</script>

<style scoped>
.hero {
  background-color: var(--primary-color);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.hero-content {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background-color: var(--accent-color);
  color: #333;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: #e6b000;
  text-decoration: none;
}

.featured-products,
.categories {
  margin-bottom: 3rem;
}

.featured-products h2,
.categories h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  position: relative;
  padding-bottom: 0.5rem;
}

.featured-products h2::after,
.categories h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--accent-color);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.category-card h3 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.category-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.error-message {
  text-align: center;
  color: var(--error-color);
  padding: 2rem;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .product-grid,
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
}
</style>