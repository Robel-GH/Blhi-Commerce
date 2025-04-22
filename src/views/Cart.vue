<template>
  <div class="cart-page container">
    <h1>{{ $t('cart.your_cart') }}</h1>
    
    <div v-if="cartStore.loading" class="cart-loading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-cart-message">
        {{ $t('cart.empty_cart_message') }}
      </div>
      <router-link to="/products" class="continue-shopping-btn">
        {{ $t('common.continue_shopping') }}
      </router-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <CartItem 
          v-for="item in cartStore.items" 
          :key="item.productId" 
          :item="item"
        />
      </div>
      
      <div class="cart-summary">
        <h2>{{ $t('cart.cart_summary') }}</h2>
        
        <div class="summary-row">
          <span>{{ $t('cart.items_in_cart') }}:</span>
          <span>{{ cartStore.cartItemsCount }}</span>
        </div>
        
        <div class="summary-row total">
          <span>{{ $t('common.total') }}:</span>
          <span>{{ $t('common.currency') }} {{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        
        <div class="cart-actions">
          <button @click="clearCart" class="clear-cart-btn">
            {{ $t('cart.clear_cart') }}
          </button>
          
          <router-link to="/checkout" class="checkout-btn">
            {{ $t('cart.proceed_to_checkout') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import CartItem from '../components/CartItem.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const cartStore = useCartStore();

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart();
  }
};
</script>

<style scoped>
.cart-page {
  padding: 2rem 0;
}

.cart-page h1 {
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-align: center;
}

.cart-content {
  display: flex;
  gap: 2rem;
}

.cart-items {
  flex: 2;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.cart-summary {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  align-self: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-summary h2 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-color);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e1e1e1;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 2px solid #e1e1e1;
}

.cart-actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkout-btn,
.clear-cart-btn,
.continue-shopping-btn {
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.checkout-btn {
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
}

.checkout-btn:hover {
  background-color: var(--secondary-color);
  text-decoration: none;
}

.clear-cart-btn {
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--error-color);
}

.clear-cart-btn:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.continue-shopping-btn {
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
}

.continue-shopping-btn:hover {
  background-color: var(--secondary-color);
  text-decoration: none;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-cart-message {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #666;
}

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-summary {
    width: 100%;
  }
}
</style>