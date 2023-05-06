<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>

</template>

<script>
import VueRouter from 'vue-router';
import PreLoading from '@/data/pictures/PreLoading';
export default {
  name: 'CartIndicator',
  components: { PreLoading },
};
</script>

<style scoped>

</style>
