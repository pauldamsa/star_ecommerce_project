<template>
    <router-link :to="{ 
            name: 'ProductDetailsPage', 
            params:{name:product.name}
        }" 
        class="shadow-md rounded-sm p-4 space-y-2 block">

        <img :src="product.preview_image" alt="product.name" class="w-[300px] h-[300px] object-cover" />
        <p class="text-base text-gray-800 font-medium mt-2">{{ product.name }}</p>
        <p class="text-xl font-bold text-gray-900">{{ product.price }} {{ product.currency }}</p>
        
    </router-link>
</template>

<script setup>
const props = defineProps(
    {
        product: Object
    }
);

</script>
