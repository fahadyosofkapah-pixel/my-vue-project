
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();

const searchQuery = ref('');

const filteredProducts = computed(() => {
  return productsStore.data.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  productsStore.loadProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto max-w-6xl">

      <!-- Page Title -->
      <h1 class="mb-8 text-3xl font-bold text-gray-800">
        Products List
      </h1>

      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-500"
      />

      <!-- Loading State -->
      <p
        v-if="productsStore.pending"
        class="text-center text-lg text-blue-600"
      >
        Loading products...
      </p>

      <!-- Error Handling -->
      <div
        v-else-if="productsStore.error"
        class="rounded-lg bg-red-100 p-4 text-red-700"
      >
        <p>{{ productsStore.error }}</p>

        <button
          @click="productsStore.loadProducts()"
          class="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>

      <!-- Products List -->
      <div
        v-else
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="overflow-hidden rounded-xl bg-white p-5 shadow-md transition hover:shadow-xl"
        >
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="mb-4 h-48 w-full object-contain"
          />

          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            {{ product.title }}
          </h2>

          <p class="text-xl font-bold text-green-600">
            ${{ product.price }}
          </p>
        </div>

        <!-- No Search Results -->
        <p
          v-if="filteredProducts.length === 0"
          class="col-span-full text-center text-gray-500"
        >
          No products found.
        </p>
      </div>

    </div>
  </div>
</template>
