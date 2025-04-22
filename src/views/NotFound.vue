<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-bglight px-4 py-16">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">{{ $t('common.not_found') }}</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        {{ $t('not_found.message', 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.') }}
      </p>
      <router-link to="/" class="btn btn-primary">
        {{ $t('common.go_back') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this view
</script>