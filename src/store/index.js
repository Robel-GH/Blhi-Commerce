import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export default createStore({
  state: {
    products: [],
    categories: [],
    cart: [],
    loading: false,
    error: null,
    language: localStorage.getItem('language') || 'en'
  },
  
  getters: {
    totalItems: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    
    getProductById: state => id => {
      return state.products.find(product => product.id === parseInt(id))
    },
    
    getProductsByCategoryId: state => categoryId => {
      if (!categoryId) return state.products
      return state.products.filter(product => product.categoryId === parseInt(categoryId))
    }
  },
  
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    
    SET_CART(state, cart) {
      state.cart = cart
    },
    
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity
        })
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    
    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    
    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    
    SET_ERROR(state, error) {
      state.error = error
    },
    
    SET_LANGUAGE(state, language) {
      state.language = language
      localStorage.setItem('language', language)
    }
  },
  
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get(`${API_URL}/products`)
        commit('SET_PRODUCTS', response.data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch products')
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchCategories({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get(`${API_URL}/categories`)
        commit('SET_CATEGORIES', response.data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch categories')
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchProductById({ commit }, productId) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get(`${API_URL}/products/${productId}`)
        // We don't store single product in state, but return it directly
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch product')
        console.error(error)
        return null
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    addToCart({ commit }, { product, quantity = 1 }) {
      commit('ADD_TO_CART', { product, quantity })
    },
    
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    
    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('UPDATE_CART_ITEM_QUANTITY', { productId, quantity })
    },
    
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    
    initializeStore({ commit }) {
      // Initialize cart from localStorage
      const cart = localStorage.getItem('cart')
      if (cart) {
        commit('SET_CART', JSON.parse(cart))
      }
    },
    
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
})
