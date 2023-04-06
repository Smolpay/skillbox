<template>
  <ul class="catalog__list" >
        <ProductItem v-for = "product in products" :key="product.id" :colors = "

colors.background_color" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem';
import colors from '@/data/colors';


export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products', 'colors'],
  computed: {
    colors() {
      return colors }
    },

};

</script>

<style scoped>

</style>
