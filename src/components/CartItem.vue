<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image || '/placeholder-image.jpg'" :alt="item.name">
    </div>
    
    <div class="item-details">
      <h3 class="item-name">{{ item.name }}</h3>
      <div class="item-price">{{ $t('common.currency') }} {{ item.price.toFixed(2) }}</div>
    </div>
    
    <div class="item-controls">
      <div class="quantity-control">
        <button 
          @click="decreaseQuantity" 
          class="quantity-btn"
          :disabled="item.quantity <= 1"
        >-</button>
        <span class="quantity">{{ item.quantity }}</span>
        <button @click="increaseQuantity" class="quantity-btn">+</button>
      </div>
      
      <div class="item-subtotal">
        {{ $t('common.subtotal') }}: {{ $t('common.currency') }} {{ (item.price * item.quantity).toFixed(2) }}
      </div>
      
      <button @click="removeFromCart" class="remove-btn">
        {{ $t('common.remove') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';

interface CartItemProps {
  item: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }
}

const props = defineProps<CartItemProps>();
const cartStore = useCartStore();

const increaseQuantity = () => {
  cartStore.updateCartItemQuantity(props.item.productId, props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateCartItemQuantity(props.item.productId, props.item.quantity - 1);
  }
};

const removeFromCart = () => {
  cartStore.removeFromCart(props.item.productId);
};
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e1e1;
  background-color: white;
}

.item-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--primary-color);
}

.item-price {
  font-weight: bold;
}

.item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 150px;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.quantity {
  width: 2.5rem;
  text-align: center;
  font-weight: bold;
}

.quantity-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.item-subtotal {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.remove-btn {
  border: none;
  background-color: transparent;
  color: var(--error-color);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
  }
  
  .item-controls {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  
  .quantity-control {
    margin-bottom: 0;
  }
}
</style>