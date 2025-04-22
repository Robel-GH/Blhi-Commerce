<template>
  <div class="category-filter">
    <h3>{{ $t('common.categories') }}</h3>
    <ul class="category-list">
      <li 
        class="category-item" 
        :class="{ active: !selectedCategory }" 
        @click="selectCategory(null)"
      >
        {{ $t('common.all_categories') }}
      </li>
      <li 
        v-for="category in categories" 
        :key="category.id" 
        class="category-item"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryStore } from '../stores/category';

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const categories = computed(() => categoryStore.categories);
const selectedCategory = ref<number | null>(null);

// Initialize selected category from the URL
watch(() => route.query.category, (newCategoryId) => {
  selectedCategory.value = newCategoryId ? parseInt(newCategoryId as string) : null;
}, { immediate: true });

const selectCategory = (categoryId: number | null) => {
  if (categoryId !== selectedCategory.value) {
    // Update the URL with the new category filter
    const query = { ...route.query };
    
    if (categoryId === null) {
      delete query.category;
    } else {
      query.category = categoryId.toString();
    }
    
    router.push({ 
      path: route.path,
      query
    });
  }
};
</script>

<style scoped>
.category-filter {
  margin-bottom: 2rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 1rem;
  background-color: white;
}

.category-filter h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--primary-color);
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 0.5rem;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  padding-left: 0.5rem;
}

.category-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.category-item.active {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}
</style>