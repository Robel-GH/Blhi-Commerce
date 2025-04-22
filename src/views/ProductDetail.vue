<template>
  <div class="product-detail container">
    <LoadingSpinner v-if="productStore.loading" />
    
    <div v-else-if="productStore.error" class="error-message">
      {{ productStore.error }}
    </div>
    
    <div v-else-if="!product" class="error-message">
      {{ $t('product.not_found') }}
    </div>
    
    <div v-else class="product-container">
      <div class="product-image">
        <img :src="product.image || '/placeholder-image.jpg'" :alt="product.name">
      </div>
      
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        
        <div class="product-price">
          {{ $t('common.currency') }} {{ product.price.toFixed(2) }}
        </div>
        
        <div class="product-description">
          <h3>{{ $t('common.description') }}</h3>
          <p>{{ product.description }}</p>
        </div>
        
        <div class="product-actions">
          <div class="quantity-selector">
            <button @click="decreaseQuantity" class="quantity-btn" :disabled="quantity <= 1">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button @click="increaseQuantity" class="quantity-btn">+</button>
          </div>
          
          <button @click="addToCart" class="add-to-cart-btn">
            {{ $t('common.add_to_cart') }}
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="relatedProducts.length > 0" class="related-products">
      <h2>{{ $t('common.related_products') }}</h2>
      <div class="product-grid">
        <ProductCard 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id" 
          :product="relatedProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import ProductCard from '../components/ProductCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const quantity = ref(1);

// Get the product ID from the route params
const productId = computed(() => parseInt(route.params.id as string));

// Get the current product from the store
const product = computed(() => 
  productStore.selectedProduct || productStore.getProductById(productId.value)
);

// Get related products (same category)
const relatedProducts = computed(() => {
  if (!product.value) return [];
  
  return productStore.products
    .filter(p => 
      p.categoryId === product.value?.categoryId && p.id !== product.value?.id
    )
    .slice(0, 4); // Limit to 4 related products
});

// Methods for quantity control
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value.id, quantity.value);
    quantity.value = 1; // Reset quantity after adding to cart
  }
};

// Watch for product ID changes to fetch product data
watch(() => productId.value, (newId) => {
  if (newId) {
    productStore.fetchProductById(newId);
  }
});

onMounted(() => {
  // Fetch the product data when component is mounted
  if (productId.value) {
    productStore.fetchProductById(productId.value);
  }
});
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.product-container {
  display: flex;
  gap: 2rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-image {
  flex: 1;
  max-width: 500px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-info {
  flex: 1;
  padding: 2rem;
}

.product-name {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.product-description {
  margin-bottom: 2rem;
}

.product-description h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.product-description p {
  line-height: 1.6;
  color: var(--text-color);
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.quantity {
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 3rem;
  font-weight: bold;
}

.quantity-btn {
  background: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #e5e5e5;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-to-cart-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
}

.add-to-cart-btn:hover {
  background-color: var(--secondary-color);
}

.related-products {
  margin-top: 3rem;
}

.related-products h2 {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  position: relative;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-color);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.error-message {
  text-align: center;
  padding: 2rem;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 8px;
  color: var(--error-color);
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }
  
  .product-image {
    max-width: 100%;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
}
</style>