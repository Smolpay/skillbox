<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }}
            </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="product.colors.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :value="color.id" v-model.number="Color">
          <span class="colors__value" :style="`background-color: ${color.code}`">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  data() {
    return {
      Color: 0,
    };
  },
  methods: {
    goToPage
  },
  props: ['product'],
  filters: {
    numberFormat
  },
  watch: {
    colorsItem(item) {
      this.Color = item;
    },
  },
};
</script>

<style scoped>

</style>
