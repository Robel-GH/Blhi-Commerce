<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image || '/placeholder-image.jpg'" :alt="product.name">
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p v-if="product.description" class="product-description">
        {{ truncateDescription(product.description) }}
      </p>
      <div class="product-price">
        {{ $t('common.currency') }} {{ product.price.toFixed(2) }}
      </div>
      <div class="product-actions">
        <router-link 
          :to="`/products/${product.id}`" 
          class="view-details-btn"
        >
          {{ $t('common.view_details') }}
        </router-link>
        <button 
          @click="addToCart"
          class="add-to-cart-btn"
        >
          {{ $t('common.add_to_cart') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    categoryId: number;
  }
}

const props = defineProps<ProductProps>();
const cartStore = useCartStore();

const truncateDescription = (description: string, maxLength = 100) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

const addToCart = () => {
  cartStore.addToCart(props.product.id);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.view-details-btn, .add-to-cart-btn {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-details-btn {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  text-decoration: none;
}

.view-details-btn:hover {
  background-color: rgba(74, 111, 165, 0.1);
}

.add-to-cart-btn {
  background-color: var(--primary-color);
  border: none;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: var(--secondary-color);
}
</style>