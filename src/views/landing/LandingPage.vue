<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="bg-primary text-white py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('landing.hero_title') }}</h1>
            <p class="text-xl mb-8 opacity-90">{{ $t('landing.hero_subtitle') }}</p>
            <div class="flex space-x-4">
              <router-link to="/products" class="btn btn-accent">
                {{ $t('landing.shop_now') }}
              </router-link>
              <router-link to="/categories" class="btn bg-transparent border border-white text-white hover:bg-white hover:text-primary">
                {{ $t('landing.explore_categories') }}
              </router-link>
            </div>
          </div>
          <div class="md:w-1/2">
            <img src="/images/hero-image.jpg" alt="E-commerce shopping" class="rounded-lg shadow-xl" onerror="this.src='https://via.placeholder.com/600x400?text=Shopping+Experience'">
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-primary">{{ $t('landing.features_title') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card p-6 text-center hover:shadow-lg transition duration-300">
            <div class="text-4xl mb-4 text-primary">🛒</div>
            <h3 class="text-xl font-semibold mb-2">{{ $t('landing.feature1_title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.feature1_description') }}</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="card p-6 text-center hover:shadow-lg transition duration-300">
            <div class="text-4xl mb-4 text-primary">🌍</div>
            <h3 class="text-xl font-semibold mb-2">{{ $t('landing.feature2_title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.feature2_description') }}</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="card p-6 text-center hover:shadow-lg transition duration-300">
            <div class="text-4xl mb-4 text-primary">🔒</div>
            <h3 class="text-xl font-semibold mb-2">{{ $t('landing.feature3_title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.feature3_description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-primary">{{ $t('landing.popular_products') }}</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in featuredProducts" :key="product.id" class="card hover:shadow-lg transition duration-300">
            <div class="h-48 overflow-hidden">
              <img :src="product.image || 'https://via.placeholder.com/300x200'" :alt="product.name" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-primary">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-800">{{ $t('common.currency') }} {{ product.price.toFixed(2) }}</span>
                <router-link :to="`/products/${product.id}`" class="text-primary hover:text-secondary">
                  {{ $t('common.view_details') }} →
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-10">
          <router-link to="/products" class="btn btn-primary">
            {{ $t('landing.view_all_products') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-primary">{{ $t('landing.testimonials_title') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="card p-6 hover:shadow-lg transition duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                <img src="https://via.placeholder.com/150" alt="Customer" class="w-full h-full object-cover">
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ $t('landing.testimonial1_name') }}</h3>
                <div class="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-600 italic">{{ $t('landing.testimonial1_text') }}</p>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="card p-6 hover:shadow-lg transition duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                <img src="https://via.placeholder.com/150" alt="Customer" class="w-full h-full object-cover">
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ $t('landing.testimonial2_name') }}</h3>
                <div class="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-600 italic">{{ $t('landing.testimonial2_text') }}</p>
          </div>
          
          <!-- Testimonial 3 -->
          <div class="card p-6 hover:shadow-lg transition duration-300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                <img src="https://via.placeholder.com/150" alt="Customer" class="w-full h-full object-cover">
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ $t('landing.testimonial3_name') }}</h3>
                <div class="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-600 italic">{{ $t('landing.testimonial3_text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ $t('landing.newsletter_title') }}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">{{ $t('landing.newsletter_subtitle') }}</p>
        
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex">
          <input 
            type="email" 
            v-model="email" 
            :placeholder="$t('landing.email_placeholder')" 
            class="flex-grow py-3 px-4 rounded-l-md focus:outline-none text-gray-800"
            required
          >
          <button type="submit" class="bg-accent text-gray-800 font-bold py-3 px-6 rounded-r-md hover:bg-amber-400 transition duration-200">
            {{ $t('landing.subscribe') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '../../stores/product';

const productStore = useProductStore();
const email = ref('');

// Get a subset of products to feature on the landing page
const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4);
});

const subscribeNewsletter = () => {
  // Here you would normally send the email to your backend
  alert(`Thank you for subscribing with: ${email.value}`);
  email.value = '';
};

onMounted(() => {
  // Fetch products when component is mounted
  if (productStore.products.length === 0) {
    productStore.fetchProducts();
  }
});
</script>