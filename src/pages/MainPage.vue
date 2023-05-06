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
                     :colors.sync="filterColor"
      />
      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from '@/components/ProductFilter';
import BasePagination from '@/components/BasePagination';
import ProductList from '@/components/ProductList.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data() {
    return {

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null,

    };
  },
  computed: {

    // if (this.filterColor) {
    //   filteredProducts = filteredProducts.filter(product => product.color.some(color => color.id === this.filterColor));
    // }
    // },
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url,
          };
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          }
        })
          .then(response => this.productsData = response.data);
      }, 0);

    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },

};

</script>

<style scoped>

</style>
