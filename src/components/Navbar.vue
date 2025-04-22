<template>
  <nav class="bg-primary text-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/" class="text-xl font-bold text-white hover:text-gray-200">
          {{ $t('common.home') }}
        </router-link>
      </div>
      
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="text-white hover:text-gray-200">
          {{ $t('common.home') }}
        </router-link>
        <router-link to="/products" class="text-white hover:text-gray-200">
          {{ $t('common.products') }}
        </router-link>
        <div class="relative">
          <select 
            v-model="currentLanguage" 
            @change="changeLanguage"
            class="bg-white text-gray-800 px-2 py-1 rounded text-sm cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="en">{{ $t('common.english') }}</option>
            <option value="ti">{{ $t('common.tigrinya') }}</option>
          </select>
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <SearchBar class="hidden md:block" />
        <router-link to="/cart" class="text-white hover:text-gray-200 flex items-center">
          <span>{{ $t('common.cart') }}</span>
          <span v-if="cartItemsCount > 0" 
                class="ml-1 bg-accent text-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {{ cartItemsCount }}
          </span>
        </router-link>
        
        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-primary border-t border-gray-600 py-2">
      <div class="container mx-auto px-4 space-y-2">
        <router-link to="/" class="block text-white py-2 hover:bg-secondary px-2 rounded">
          {{ $t('common.home') }}
        </router-link>
        <router-link to="/products" class="block text-white py-2 hover:bg-secondary px-2 rounded">
          {{ $t('common.products') }}
        </router-link>
        <div class="py-2">
          <SearchBar />
        </div>
        <div class="flex items-center py-2">
          <span class="text-white mr-2">{{ $t('common.language') }}:</span>
          <select 
            v-model="currentLanguage" 
            @change="changeLanguage"
            class="bg-white text-gray-800 px-2 py-1 rounded text-sm cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="en">{{ $t('common.english') }}</option>
            <option value="ti">{{ $t('common.tigrinya') }}</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '../stores/cart';
import SearchBar from './SearchBar.vue';

const { locale } = useI18n();
const cartStore = useCartStore();

const currentLanguage = ref(locale.value);
const cartItemsCount = computed(() => cartStore.cartItemsCount);
const mobileMenuOpen = ref(false);

const changeLanguage = () => {
  locale.value = currentLanguage.value;
  localStorage.setItem('language', currentLanguage.value);
};

// Watch for language changes from other components
watch(() => locale.value, (newLocale) => {
  currentLanguage.value = newLocale;
});
</script>