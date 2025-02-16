<template>
    <div class="p-5">
        <div v-if="productDoc">
            <h1 class="font-black text-gray-900 text-3xl "> {{ productDoc.name }} </h1>
            <div class="sm:flex gap-6 mt-5">
                <div class="flex gap-3 flex-col w-fit mt-5">
                    <div @click="currentPreviewImageURL = image.image_url"  
                        :class='[
                            "p-3 border-2 border-gray-600/25 rounded hover:bg-black-overlay-50 cursor-pointer",
                            currentPreviewImageURL === image.image_url ? "bg-black-overlay-50" : ""
                        ]'
                        v-for="image in productDoc.images">
                            <img 
                                class = "h-16"
                                :src="image.image_url"
                                alt="name"
                            />
                    </div>
                </div>
                <img :src="currentPreviewImageURL" alt="productDoc.name"  class="sm:max-w-md"/>
            </div>

            <div class="prose" v-html="md.render(productDoc.description)"></div>

            <div>
                <p class="text-gray-800 text-3xl mt-10">{{ getPrice(productDoc.price, productDoc.currency) }}</p>
                <Button
                    @click="addProductToCart" 
                    :variant="'solid'"
                    :ref_for="true"
                    theme="gray"
                    size="sm"
                    label="Button">
                    <template #prefix>
                        <FeatherIcon class="h-4"name="shopping-cart" />
                    </template>
                    Add to cart
                </Button>
                <p>{{ cart.secret }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import markdownit from 'markdown-it';
import { computed, watch, ref,inject } from 'vue';
import { useRoute } from 'vue-router';
import { getPrice } from '@/utils';
import { Button, createDocumentResource, FeatherIcon } from 'frappe-ui';
import { useToast } from "vue-toastification";

const route = useRoute();
const toast = useToast();
const cart = inject('cart', { items: [] });

const md = markdownit();

const currentPreviewImageURL = ref(null);


const productResource = createDocumentResource({
    doctype: 'Product',
    name: route.params.name,
    fields: ["name", "price", "preview_image", "currency"],
    auto: true,
    onSuccess(data){
        currentPreviewImageURL.value = data.images[0].image_url;
    }
});

const productDoc = computed(() => {
    if (productResource.doc) {
        return productResource.doc;
    }
    return {};
});

watch (productDoc, () => {
    if (productDoc.value.images) {
        currentPreviewImageURL.value = productDoc.value.images[0].image_url;
    }
})


function addProductToCart() {
    const productName = route.params.name;
    if (!Array.isArray(cart.items)) {
        cart.items = [];
    }
    cart.items.push({
        product: productName,
        qty: 1
    });
    toast.success(`${productName} added to cart`);
    console.log(`Added ${productName} to cart`);
}
</script>