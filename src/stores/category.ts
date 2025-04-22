import { defineStore } from 'pinia';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getCategoryById: (state) => (id: number) => {
      return state.categories.find(category => category.id === id) || null;
    }
  },
  
  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.error = 'Failed to load categories';
      } finally {
        this.loading = false;
      }
    }
  }
});