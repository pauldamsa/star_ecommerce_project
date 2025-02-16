<template>
    <div>
        <h1>Checkout</h1>
        <Button :loading="placeOrderResource.loading" @click="placeOrderResource.submit()" variant="solid" label="Place Order" />
        <ErrorMessage :message="placeOrderResource.error" />
    </div>
</template>

<script setup>
import { createResource, Button, ErrorMessage } from 'frappe-ui';
import { inject } from 'vue';

const cart = inject('cart');

const placeOrderResource = createResource({
    url: 'star_ecom.api.place_order',
    makeParams(){
        return {
            products: cart.items
        }
    }
})
</script>