<template>
    <div>
        <nav class="p-3 flex items-center justify-between bg-white shadow-md">
            <router-link :to="{name:'ProductsListPage'}" class="text-2xl font-bold text-gray-800">
            * Star Store *
            </router-link>

            <button @click="cartDiaglogShown = true" class="flex">
                <FeatherIcon name="shopping-cart" class="h-6" />
                <Badge variant="solid" class="ml-2">{{ cartItemsCount }}</Badge>
            </button>
        </nav>
    </div>
    <Dialog :options="{
        title: 'Cart',
        size: 'md',
        showClose: true,
        center: true,
        actions:[
            {
                label: 'Proceed to Checkout',
                variant: 'solid',
                onClick: () =>{
                    router.push({name: 'CheckoutPage'});
                    cartDiaglogShown = false;
                }
                // action: () => cartDiaglogShown.value = false
            }
        ]
    }" v-model="cartDiaglogShown">
        <template #body-content>
            <ul>
                <li v-for="(item, index) in cart.items">
                    # {{ index + 1 }}. {{ item.product }}
                    <FormControl v-model="item.qty" type="number" placceholder="Qty" />
                    <Button class="mt-2" @click="cart.items.splice(index, 1)" variant="outline" theme="red" label="Remove" />
                </li>
            </ul>
        </template>
    </Dialog>
    
</template>

<script setup>
import { FeatherIcon, Button, Badge, Dialog, FormControl } from 'frappe-ui';
import { inject, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = inject('cart', { items: [] }); // Provide default value
const cartItemsCount = computed(() => cart?.items?.length || 0);

const cartDiaglogShown = ref(false);
</script>