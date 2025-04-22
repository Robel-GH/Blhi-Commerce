<template>
  <div class="checkout-page container">
    <h1>{{ $t('common.checkout') }}</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart-checkout">
      <div class="empty-cart-message">
        {{ $t('cart.empty_cart_message') }}
      </div>
      <router-link to="/products" class="continue-shopping-btn">
        {{ $t('common.continue_shopping') }}
      </router-link>
    </div>
    
    <div v-else class="checkout-content">
      <form @submit.prevent="submitOrder" class="checkout-form">
        <div class="form-section">
          <h2>{{ $t('checkout.shipping_info') }}</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">{{ $t('checkout.first_name') }}</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="form.firstName" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="lastName">{{ $t('checkout.last_name') }}</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="form.lastName" 
                required
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('checkout.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
            >
          </div>
          
          <div class="form-group">
            <label for="address">{{ $t('checkout.address') }}</label>
            <input 
              type="text" 
              id="address" 
              v-model="form.address" 
              required
            >
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="city">{{ $t('checkout.city') }}</label>
              <input 
                type="text" 
                id="city" 
                v-model="form.city" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="zip">{{ $t('checkout.zip') }}</label>
              <input 
                type="text" 
                id="zip" 
                v-model="form.zip" 
                required
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="country">{{ $t('checkout.country') }}</label>
            <input 
              type="text" 
              id="country" 
              v-model="form.country" 
              required
            >
          </div>
        </div>
        
        <div class="form-section">
          <h2>{{ $t('checkout.payment_info') }}</h2>
          
          <div class="form-group">
            <label for="cardNumber">{{ $t('checkout.card_number') }}</label>
            <input 
              type="text" 
              id="cardNumber" 
              v-model="form.cardNumber" 
              required
              placeholder="1234 5678 9012 3456"
            >
          </div>
          
          <div class="form-group">
            <label for="cardName">{{ $t('checkout.card_name') }}</label>
            <input 
              type="text" 
              id="cardName" 
              v-model="form.cardName" 
              required
            >
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiryDate">{{ $t('checkout.expiry_date') }}</label>
              <input 
                type="text" 
                id="expiryDate" 
                v-model="form.expiryDate" 
                required
                placeholder="MM/YY"
              >
            </div>
            
            <div class="form-group">
              <label for="cvv">{{ $t('checkout.cvv') }}</label>
              <input 
                type="text" 
                id="cvv" 
                v-model="form.cvv" 
                required
                placeholder="123"
              >
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <router-link to="/cart" class="back-btn">
            {{ $t('checkout.back_to_cart') }}
          </router-link>
          
          <button type="submit" class="place-order-btn" :disabled="submitting">
            <span v-if="submitting">Processing...</span>
            <span v-else>{{ $t('checkout.place_order') }}</span>
          </button>
        </div>
      </form>
      
      <div class="order-summary">
        <h2>{{ $t('checkout.order_summary') }}</h2>
        
        <div class="summary-items">
          <div 
            v-for="item in cartStore.items" 
            :key="item.productId"
            class="summary-item"
          >
            <div class="item-name">
              {{ item.name }} <span class="item-quantity">x{{ item.quantity }}</span>
            </div>
            <div class="item-price">
              {{ $t('common.currency') }} {{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
        
        <div class="summary-total">
          <div class="total-label">{{ $t('common.total') }}</div>
          <div class="total-price">
            {{ $t('common.currency') }} {{ cartStore.cartTotal.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';

const router = useRouter();
const cartStore = useCartStore();
const submitting = ref(false);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
});

const submitOrder = async () => {
  try {
    submitting.value = true;
    
    // Here you would normally send the order to the backend
    // For now, we'll just simulate a successful order
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear the cart and show success message
    cartStore.clearCart();
    alert('Order placed successfully!');
    
    // Redirect to home page
    router.push('/');
  } catch (error) {
    console.error('Failed to place order:', error);
    alert('Failed to place your order. Please try again.');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 2rem 0;
}

.checkout-page h1 {
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-align: center;
}

.checkout-content {
  display: flex;
  gap: 2rem;
}

.checkout-form {
  flex: 2;
}

.form-section {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e1e1e1;
  font-size: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.back-btn,
.place-order-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.back-btn {
  background-color: #f1f1f1;
  color: var(--text-color);
  text-decoration: none;
}

.back-btn:hover {
  background-color: #e0e0e0;
  text-decoration: none;
}

.place-order-btn {
  background-color: var(--primary-color);
  color: white;
}

.place-order-btn:hover:not(:disabled) {
  background-color: var(--secondary-color);
}

.place-order-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.order-summary {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  align-self: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-summary h2 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e1e1e1;
  font-size: 1.25rem;
}

.summary-items {
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e1e1e1;
}

.item-name {
  font-weight: 500;
}

.item-quantity {
  font-weight: normal;
  color: #666;
  margin-left: 0.5rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.empty-cart-checkout {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-cart-message {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #666;
}

.continue-shopping-btn {
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.continue-shopping-btn:hover {
  background-color: var(--secondary-color);
  text-decoration: none;
}

@media (max-width: 768px) {
  .checkout-content {
    flex-direction: column;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>