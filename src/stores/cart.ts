import { defineStore } from 'pinia';
import { useProductStore } from './product';

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false
  }),
  
  getters: {
    cartItemsCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  
  actions: {
    initializeCart() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          this.items = JSON.parse(storedCart);
        } catch (error) {
          console.error('Failed to parse stored cart:', error);
          this.items = [];
        }
      }
    },
    
    saveCartToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    addToCart(productId: number, quantity = 1) {
      this.loading = true;
      
      try {
        const productStore = useProductStore();
        const product = productStore.getProductById(productId);
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        const existingItem = this.items.find(item => item.productId === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.items.push({
            productId,
            quantity,
            name: product.name,
            price: product.price,
            image: product.image
          });
        }
        
        this.saveCartToStorage();
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        this.loading = false;
      }
    },
    
    updateCartItemQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.productId === productId);
      
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          this.removeFromCart(productId);
        }
        
        this.saveCartToStorage();
      }
    },
    
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.productId !== productId);
      this.saveCartToStorage();
    },
    
    clearCart() {
      this.items = [];
      this.saveCartToStorage();
    }
  }
});