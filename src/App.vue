<template>
<ProductList/>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList';

export default {
  name: 'App',
  components: { ProductList },
  data() {
    return {
      products,
    };
  },
};
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
