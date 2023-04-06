<template>
   <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товаров
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom"
                     :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color.sync="filterColor"/>
      <section class="catalog">
    <ProductList :products="products"/>
    <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductFilter from '@/components/ProductFilter';
import BasePagination from '@/components/BasePagination';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,

      page: 1,
      productsPerPage: 3,


    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product =>
          product.categoryId === this.filterCategoryId);
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter(product =>
        product.colors === this.filterColor)
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
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
