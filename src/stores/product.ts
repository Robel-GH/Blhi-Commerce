import { defineStore } from 'pinia';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: number;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(product => product.id === id) || null;
    },
    getProductsByCategory: (state) => (categoryId: number) => {
      return state.products.filter(product => product.categoryId === categoryId);
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get('/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(id: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`/api/products/${id}`);
        this.selectedProduct = response.data;
      } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        this.error = 'Failed to load product details';
      } finally {
        this.loading = false;
      }
    }
  }
});