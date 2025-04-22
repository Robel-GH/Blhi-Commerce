<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ $t('common.home') }}</h3>
          <ul>
            <li><router-link to="/">{{ $t('common.home') }}</router-link></li>
            <li><router-link to="/products">{{ $t('common.products') }}</router-link></li>
            <li><router-link to="/cart">{{ $t('common.cart') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>{{ $t('common.categories') }}</h3>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <router-link :to="`/products?category=${category.id}`">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>{{ $t('common.language') }}</h3>
          <div class="language-buttons">
            <button 
              class="lang-btn" 
              :class="{ active: currentLanguage === 'en' }" 
              @click="changeLanguage('en')">
              {{ $t('common.english') }}
            </button>
            <button 
              class="lang-btn" 
              :class="{ active: currentLanguage === 'ti' }" 
              @click="changeLanguage('ti')">
              {{ $t('common.tigrinya') }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 {{ $t('common.home') }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCategoryStore } from '../stores/category';

const { locale } = useI18n();
const categoryStore = useCategoryStore();

const currentLanguage = ref(locale.value);
const categories = computed(() => categoryStore.categories.slice(0, 5)); // Show only first 5 categories

const changeLanguage = (lang: string) => {
  locale.value = lang;
  currentLanguage.value = lang;
  localStorage.setItem('language', lang);
};
</script>

<style scoped>
.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 2rem 0 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: white;
  text-decoration: none;
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
}

.language-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.lang-btn {
  background-color: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-btn:hover {
  background-color: rgba(255,255,255,0.1);
}

.lang-btn.active {
  background-color: white;
  color: var(--primary-color);
  border-color: white;
}
</style>