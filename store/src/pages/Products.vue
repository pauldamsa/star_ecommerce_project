<template>
  <h2 class="my-4 text-xl font-bold text-gray-800 mt-4">
    Products
  </h2>
  <hr>

  <div class="mt-4 grid grid-cols-4 gap-3" v-if="productList">
    <ProductCard v-for="product in productList" :key="product.name" :product="product" />
  </div>
</template>

<script setup>
import { createListResource } from 'frappe-ui';
import { computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const productResource = createListResource({
  doctype: 'Product',
  fields:["name", "price", "preview_image", "currency"],
  auto: true
})

const productList = computed(() => {
  if (productResource.list.data) {
    return productResource.list.data;
  }
  return [];
})
</script>
