<template>
  <ul class="catalog__list" >
        <ProductItem v-for = "(product, index) in products" :key="index" :product="product"/>
  </ul>
</template>

<script>
import products from '@/data/products';
import ProductItem from '@/components/ProductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  data() {
    return {
      products,
    };
  },
};

</script>

<style scoped>

</style>
