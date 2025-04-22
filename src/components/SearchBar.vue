<template>
  <div class="flex w-full max-w-xs">
    <input 
      type="text" 
      v-model="searchQuery" 
      :placeholder="$t('common.search')" 
      @keyup.enter="performSearch"
      class="flex-grow px-3 py-2 border-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent text-gray-800 text-sm"
    />
    <button 
      @click="performSearch" 
      class="bg-accent text-gray-800 border-0 rounded-r-md px-3 flex items-center justify-center hover:bg-amber-400 transition duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    });
    searchQuery.value = '';
  }
};
</script>